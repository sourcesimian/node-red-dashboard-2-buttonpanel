module.exports = function (RED) {
  const widgets = [
    'text',
    'button',
    'switch',
    'fader',
    'select',
    'image',
    'iframe'
  ]

  function parseScalar (value) {
    const trimmed = String(value).trim()
    if (!trimmed) {
      return ''
    }
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1)
    }
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return trimmed.slice(1, -1).split(',').map(item => parseScalar(item))
    }
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      return Number(trimmed)
    }
    if (trimmed === 'true') {
      return true
    }
    if (trimmed === 'false') {
      return false
    }
    if (trimmed === 'null') {
      return null
    }
    return trimmed
  }

  function assignYamlPair (target, line) {
    const index = line.indexOf(':')
    if (index === -1) {
      return
    }
    const key = line.slice(0, index).trim()
    const value = line.slice(index + 1).trim()
    if (key) {
      target[key] = parseScalar(value)
    }
  }

  function parseYamlConfig (value) {
    if (!value || typeof value !== 'string') {
      return {}
    }

    const rows = String(value).split(/\r?\n/)
    const parsed = {}
    let section = null
    let current = null

    for (const rawLine of rows) {
      if (!rawLine.trim() || rawLine.trim().startsWith('#')) {
        continue
      }

      const indent = rawLine.match(/^\s*/)[0].length
      const line = rawLine.trim()

      if (indent === 0 && line.endsWith(':') && ['values', 'ranges', 'attributes'].includes(line.slice(0, -1).trim())) {
        section = line.slice(0, -1).trim()
        current = null
        parsed[section] = section === 'values' || section === 'ranges' ? [] : {}
      } else if (indent === 0) {
        section = null
        current = null
        assignYamlPair(parsed, line)
      } else if (section && Array.isArray(parsed[section]) && line.startsWith('- ')) {
        current = {}
        parsed[section].push(current)
        assignYamlPair(current, line.slice(2))
      } else if (section && Array.isArray(parsed[section]) && current) {
        assignYamlPair(current, line)
      } else if (section && parsed[section] && typeof parsed[section] === 'object') {
        assignYamlPair(parsed[section], line)
      }
    }

    return parsed
  }

  function getPathValue (source, path) {
    const parts = String(path).replace(/^msg\./, '').split('.').filter(Boolean)
    return parts.reduce((value, part) => {
      if (value === null || typeof value === 'undefined') {
        return undefined
      }
      return value[part]
    }, source)
  }

  function evaluateValueFrom (RED, node, msg, expression, callback) {
    const source = expression || 'msg.payload'
    if (/^(msg\.)?[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/.test(source)) {
      callback(null, getPathValue(msg, source))
      return
    }

    if (RED.util && typeof RED.util.evaluateNodeProperty === 'function') {
      RED.util.evaluateNodeProperty(source, 'jsonata', node, msg, callback)
      return
    }

    callback(new Error('value_from requires dot notation or a Node-RED runtime with JSONata support'))
  }

  function hasConfiguredValue (value) {
    return value !== null && typeof value !== 'undefined' && String(value) !== ''
  }

  function createButtonPanelNode (widgetType) {
    return function UIButtonPanelNode (config) {
      config.widgetType = config.widgetType || widgetType
      RED.nodes.createNode(this, config)
      const node = this
      const group = RED.nodes.getNode(config.group)

      if (!group) {
        node.error('No Dashboard group configured')
        return
      }

      const base = group.getBase()
      const widgetConfig = parseYamlConfig(config.config)
      const evts = {
        onAction: true,
        beforeSend: function (msg) {
          const updates = msg.ui_update
          if (updates && Object.prototype.hasOwnProperty.call(updates, 'config')) {
            base.stores.state.set(base, node, msg, 'config', updates.config)
          }
          const buttonpanelTopic = msg._buttonpanel_topic
          delete msg._buttonpanel_topic
          if (hasConfiguredValue(buttonpanelTopic)) {
            msg.topic = buttonpanelTopic
          } else if (!hasConfiguredValue(msg.topic)) {
            delete msg.topic
          }
          return msg
        },
        onInput: function (msg, send, done) {
          evaluateValueFrom(RED, node, msg, widgetConfig.value_from, function (error, value) {
            if (error) {
              node.error(error.message, msg)
              if (done) {
                done(error)
              }
              return
            }
            if (typeof value !== 'undefined') {
              msg.payload = value
              base.stores.data.save(base, node, msg)
            } else {
              delete msg.payload
            }
            if (done) {
              done()
            }
          })
        }
      }

      group.register(node, config, evts)
    }
  }

  for (const widget of widgets) {
    RED.nodes.registerType(`ui-buttonpanel-${widget}`, createButtonPanelNode(widget))
  }
}
