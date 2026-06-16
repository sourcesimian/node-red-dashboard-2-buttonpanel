<template>
  <div
    class="bp-widget"
    :class="[
      `bp-${widgetType}`,
      {
        'bp-clickable': isActionable,
        'bp-disabled': disabled,
        'bp-active': isActive,
        'bp-sending': sending,
        'bp-pending': pending,
        'bp-unknown-state': isUnknown,
        'bp-state-on': isStateOn
      }
    ]"
    @click="handleClick"
  >
    <div class="bp-title">{{ title }}</div>

    <div v-if="widgetType === 'image' || widgetType === 'iframe'" class="bp-media-frame">
      <div v-if="widgetType === 'image'" class="bp-image" :style="imageStyle">
        <img v-if="displayValue" :src="displayValue" :alt="title">
        <div v-else class="bp-unknown">unknown</div>
      </div>

      <iframe
        v-else
        class="bp-iframe"
        :src="displayValue"
        :style="iframeStyle"
        v-bind="iframeAttributes"
        frameborder="0"
      />

      <div v-if="disabled" class="bp-media-disabled" aria-hidden="true">
      </div>
    </div>

    <template v-else-if="widgetType === 'fader'">
      <div class="bp-main bp-gauge-body" :class="{ 'bp-gauge-metered': showMeter }">
        <div v-if="currentRange.icon || currentRange.text" class="bp-gauge-meta" :style="stateStyle">
          <span v-if="currentRange.icon" class="bp-icon material-icons">{{ currentRange.icon }}</span>
          <span v-if="currentRange.text" class="bp-text bp-gauge-label">{{ currentRange.text }}</span>
        </div>
        <span class="bp-number">{{ hasValue ? formattedNumericValue : '?' }}</span>
      </div>
      <div v-if="showMeter" class="bp-meter">
        <span :style="meterStyle" />
      </div>
    </template>

    <template v-else-if="widgetType === 'switch' || widgetType === 'select'">
      <div class="bp-main bp-state-body">
        <span v-if="currentState.icon" class="bp-state-indicator" :style="indicatorStyle">
          <span class="bp-icon material-icons">{{ currentState.icon }}</span>
        </span>
        <span v-if="currentState.text" class="bp-text bp-state-text" :style="stateStyle">{{ currentState.text }}</span>
      </div>
    </template>

    <template v-else-if="widgetType === 'button'">
      <div class="bp-main bp-button-body" :style="baseStyle">
        <span v-if="buttonIcon" class="bp-button-icon material-icons">{{ buttonIcon }}</span>
        <span v-if="buttonText" class="bp-button-text">{{ buttonText }}</span>
      </div>
    </template>

    <div v-else class="bp-text-body" :style="baseStyle">
      <span v-if="textIcon" class="bp-text-quote material-icons">{{ textIcon }}</span>
      <span v-if="textValue" class="bp-text-value">{{ textValue }}</span>
    </div>

    <div class="bp-last-update">{{ lastUpdateText }}</div>
    <div v-if="sending || pending" class="bp-status-overlay">
      <span class="bp-spinner" />
      <span>{{ sending ? 'sending' : 'waiting' }}</span>
    </div>

    <Teleport to="body">
      <div v-if="modal" class="bp-modal-backdrop" @click.stop="closeModal(false)">
        <div class="bp-modal" @click.stop>
          <button class="bp-modal-close" type="button" aria-label="Close" @click="closeModal(false)">
            <span aria-hidden="true" />
          </button>
          <div class="bp-modal-title">{{ title }}</div>

          <div v-if="modal === 'confirm'" class="bp-confirm">
            <div>{{ confirmMessage }}</div>
            <div class="bp-modal-actions">
              <button @click="confirmProceed">OK</button>
              <button @click="closeModal(false)">Cancel</button>
            </div>
          </div>

          <div v-else-if="modal === 'pin'" class="bp-pin-modal">
            <div v-if="confirmMessage" class="bp-pin-message">{{ confirmMessage }}</div>
            <div class="bp-pin-dots">
              <span
                v-for="index in pinLength"
                :key="index"
                :class="{ 'bp-pin-dot-filled': index <= pinValue.length }"
              />
            </div>
            <div class="bp-pin-keypad">
              <button
                v-for="digit in pinDigits"
                :key="digit"
                type="button"
                @click="appendPinDigit(digit)"
              >
                {{ digit }}
              </button>
              <button class="bp-pin-key-blank" type="button" disabled />
              <button type="button" @click="appendPinDigit('0')">0</button>
              <button class="bp-pin-backspace material-icons" type="button" aria-label="Backspace" @click="removePinDigit">backspace</button>
            </div>
          </div>

          <div v-else-if="modal === 'select'" class="bp-select-list">
            <button
              v-for="stateOption in configuredStates"
              :key="stateOption.value"
              :style="{ color: stateOption.color || undefined }"
              @click="sendSelection(stateOption)"
            >
              <span v-if="stateOption.icon" class="bp-icon material-icons">{{ stateOption.icon }}</span>
              <span v-if="stateOption.text">{{ stateOption.text }}</span>
            </button>
          </div>

          <div v-else-if="modal === 'value'" class="bp-value-modal">
            <input
              v-model="editValue"
              class="bp-value-input"
              type="text"
              @input="resetInputTimeout"
              @keydown.enter="commitValue"
              @keydown.esc="closeModal(false)"
            >
            <div class="bp-modal-actions">
              <button @click="commitValue">OK</button>
              <button @click="closeModal(false)">Cancel</button>
            </div>
          </div>

          <div v-else-if="modal === 'fader'" class="bp-fader-modal">
            <div v-if="faderRange.icon || faderRange.text" class="bp-fader-meta" :style="{ color: faderRange.color || undefined }">
              <span v-if="faderRange.icon" class="bp-icon material-icons">{{ faderRange.icon }}</span>
              <span v-if="faderRange.text">{{ faderRange.text }}</span>
            </div>
            <div class="bp-fader-value">{{ formattedFaderValue }}</div>
            <input
              v-model.number="faderValue"
              type="range"
              :style="faderTrackStyle"
              :min="min"
              :max="max"
              @input="handleFaderInput"
              @change="commitFader"
            >
            <div class="bp-fader-bounds">
              <span>{{ formattedMax }}</span>
              <span>{{ formattedMin }}</span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const DEFAULT_STATES = [
  { value: 'OFF', text: 'Off', icon: 'toggle_off', color: '#7f8790' },
  { value: 'ON', text: 'On', icon: 'toggle_on', color: '#52D017' }
]

const DEFAULT_RANGES = [
  { range: [0, 100], text: '', icon: '', color: '#ccc' }
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
    return trimmed
      .slice(1, -1)
      .split(',')
      .map(item => parseScalar(item))
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
  const config = {}
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
      config[section] = section === 'values' || section === 'ranges' ? [] : {}
    } else if (indent === 0) {
      section = null
      current = null
      assignYamlPair(config, line)
    } else if (section && Array.isArray(config[section]) && line.startsWith('- ')) {
      current = {}
      config[section].push(current)
      assignYamlPair(current, line.slice(2))
    } else if (section && Array.isArray(config[section]) && current) {
      assignYamlPair(current, line)
    } else if (section && config[section] && typeof config[section] === 'object') {
      assignYamlPair(config[section], line)
    }
  }

  return config
}

function payloadText (value) {
  if (value === null || typeof value === 'undefined') {
    return ''
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

function optionalNumber (value) {
  if (value === '' || value === null || typeof value === 'undefined') {
    return null
  }
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function hasConfiguredValue (value) {
  return value !== null && typeof value !== 'undefined' && String(value) !== ''
}

function hasOwn (item, key) {
  return Object.prototype.hasOwnProperty.call(item || {}, key)
}

function configuredText (item, fallback) {
  return hasOwn(item, 'text') ? payloadText(item.text) : payloadText(fallback)
}

function configuredIcon (item, fallback, text) {
  if (hasOwn(item, 'icon')) {
    const icon = payloadText(item.icon)
    return icon || (text ? '' : fallback)
  }
  return fallback
}

function pinLengthFrom (value) {
  const length = Number(value)
  return Number.isInteger(length) && length > 0 ? length : 0
}

function pad2 (value) {
  return String(value).padStart(2, '0')
}

function formatSeconds (value, showSeconds) {
  const number = Number(value)
  if (!Number.isFinite(number)) {
    return payloadText(value)
  }
  const sign = number < 0 ? '-' : ''
  let total = Math.floor(Math.abs(number))
  const days = Math.floor(total / 86400)
  total %= 86400
  const hours = Math.floor(total / 3600)
  total %= 3600
  const minutes = Math.floor(total / 60)
  const seconds = total % 60

  if (!showSeconds) {
    return days > 0
      ? `${sign}${days}d ${hours}:${pad2(minutes)}`
      : `${sign}${hours}:${pad2(minutes)}`
  }
  if (days > 0) {
    return `${sign}${days}d ${hours}:${pad2(minutes)}:${pad2(seconds)}`
  }
  if (hours > 0) {
    return `${sign}${hours}:${pad2(minutes)}:${pad2(seconds)}`
  }
  if (minutes > 0) {
    return `${sign}${minutes}:${pad2(seconds)}`
  }
  return `${sign}0:${pad2(seconds)}`
}

export default {
  name: 'UIButtonPanel',
  inject: ['$socket', '$dataTracker'],
  props: ['id', 'props', 'state'],
  data () {
    return {
      lastSeen: null,
      ticker: Date.now(),
      pending: false,
      sending: false,
      modal: null,
      confirmMessage: '',
      confirmCallback: null,
      pinMessage: null,
      pinWaits: true,
      pinLength: 0,
      pinValue: '',
      pinDigits: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      faderValue: 0,
      editValue: '',
      dialogTimer: null,
      liveTimer: null,
      sendingTimer: null,
      lastLiveValue: null,
      latestMsg: {}
    }
  },
  computed: {
    ...mapState('data', ['messages']),
    message () {
      return {
        ...(this.messages?.[this.id] || {}),
        ...(this.latestMsg || {})
      }
    },
    config () {
      const base = {
        ...(this.props || {}),
        ...(this.state?.config || {})
      }
      return {
        ...base,
        ...parseYamlConfig(base.config)
      }
    },
    widgetType () {
      return this.config.widgetType || 'text'
    },
    title () {
      return this.config.label || ''
    },
    readOnlyCapable () {
      return ['text', 'switch', 'fader', 'image'].includes(this.widgetType)
    },
    readOnlyDefault () {
      return this.widgetType === 'text' || this.widgetType === 'image'
    },
    hasInput () {
      return true
    },
    hasOutput () {
      if (this.readOnlyCapable) {
        return !this.readOnlyMode
      }
      return ['button', 'select'].includes(this.widgetType)
    },
    shouldWaitForInput () {
      return this.hasInput && this.hasOutput
        ? this.config.waitForInput !== false && this.config.waitForInput !== 'false'
        : false
    },
    isActive () {
      return Boolean(this.modal)
    },
    disabled () {
      return this.state?.enabled === false ||
        this.state?.visible === false ||
        this.message.enabled === false
    },
    readOnlyMode () {
      return this.readOnlyCapable &&
        (this.config.readOnly === true || this.config.readOnly === 'true')
    },
    showMeter () {
      return this.widgetType === 'fader' && this.config.showMeter !== false && this.config.showMeter !== 'false'
    },
    isActionable () {
      if (this.readOnlyCapable) {
        return !this.readOnlyMode
      }
      return ['button', 'select'].includes(this.widgetType)
    },
    displayValue () {
      if (this.widgetType === 'text') {
        return payloadText(this.message.payload ?? this.config.text)
      }
      return payloadText(this.message.payload)
    },
    textValue () {
      return this.displayValue
    },
    textIcon () {
      return configuredIcon(this.config, this.readOnlyMode ? 'article' : 'keyboard', this.textValue)
    },
    hasValue () {
      const value = this.message.payload
      return value !== null && typeof value !== 'undefined' && value !== ''
    },
    numericValue () {
      const value = Number(this.message.payload)
      return Number.isFinite(value) ? value : null
    },
    formattedNumericValue () {
      return this.formatFaderValue(this.numericValue)
    },
    formattedFaderValue () {
      return this.formatFaderValue(this.faderValue)
    },
    formattedMin () {
      return this.formatFaderValue(this.min)
    },
    formattedMax () {
      return this.formatFaderValue(this.max)
    },
    min () {
      const configured = optionalNumber(this.config.min)
      if (configured !== null) {
        return configured
      }
      return 0
    },
    max () {
      const configured = optionalNumber(this.config.max)
      if (configured !== null) {
        return configured
      }
      return 100
    },
    percent () {
      if (!Number.isFinite(this.numericValue) || this.max === this.min) {
        return 0
      }
      const clamped = Math.max(this.min, Math.min(this.max, this.numericValue))
      return Math.round(((clamped - this.min) / (this.max - this.min)) * 100)
    },
    meterStyle () {
      return {
        height: `${this.percent}%`,
        minHeight: this.percent > 0 ? '1px' : '0',
        backgroundColor: this.currentRange.color || '#ccc'
      }
    },
    configuredStates () {
      return (Array.isArray(this.config.values) ? this.config.values : DEFAULT_STATES).map(item => {
        const text = configuredText(item, item.value)
        const fallbackIcon = configuredIcon(this.config, this.defaultStateIcon(item), text)
        return {
          value: item.value,
          valueText: payloadText(item.value),
          text,
          icon: configuredIcon(item, fallbackIcon, text),
          color: item.color || this.defaultStateColor(item),
          topic: hasOwn(item, 'topic') ? item.topic : (this.config.topic || ''),
          confirm: hasOwn(item, 'confirm') ? item.confirm : (this.config.confirm || ''),
          confirmPin: pinLengthFrom(hasOwn(item, 'confirm_pin') ? item.confirm_pin : this.config.confirm_pin),
          inputTimeout: hasOwn(item, 'input_timeout') ? item.input_timeout : this.config.input_timeout
        }
      })
    },
    currentState () {
      const value = payloadText(this.message.payload)
      const fallbackText = configuredText(this.config, 'unknown')
      return this.configuredStates.find(item => item.valueText === value) || {
        value: '',
        text: fallbackText,
        icon: configuredIcon(this.config, 'do_not_disturb', fallbackText),
        color: this.config.color || undefined
      }
    },
    isUnknown () {
      if (['switch', 'select'].includes(this.widgetType)) {
        return this.currentState.valueText === '' || this.currentState.value === ''
      }
      if (this.widgetType === 'text') {
        return !this.displayValue
      }
      if (['image', 'iframe', 'fader'].includes(this.widgetType)) {
        return !this.hasValue
      }
      return false
    },
    isStateOn () {
      if (!['switch', 'select'].includes(this.widgetType)) {
        return false
      }
      const value = `${this.currentState.valueText || payloadText(this.currentState.value)} ${this.currentState.text}`.toLowerCase()
      return value.includes('true') || value.includes('on')
    },
    ranges () {
      return (Array.isArray(this.config.ranges) ? this.config.ranges : DEFAULT_RANGES).map(item => {
        const text = configuredText(item, hasOwn(this.config, 'text') ? this.config.text : '')
        const fallbackIcon = configuredIcon(this.config, 'tune', text)
        return {
          range: item.range || [this.min, this.max],
          text,
          icon: configuredIcon(item, fallbackIcon, text),
          color: item.color || '#ccc'
        }
      })
    },
    currentRange () {
      return this.rangeFor(this.numericValue)
    },
    faderRange () {
      return this.rangeFor(Number(this.faderValue))
    },
    faderTrackStyle () {
      const value = Number(this.faderValue)
      const percent = Number.isFinite(value) && this.max !== this.min
        ? Math.max(0, Math.min(100, ((value - this.min) / (this.max - this.min)) * 100))
        : 0
      return {
        '--bp-fader-color': this.faderRange.color || this.currentRange.color || '#ccc',
        '--bp-fader-percent': `${percent}%`
      }
    },
    baseStyle () {
      return this.config.color ? { color: this.config.color } : {}
    },
    imageStyle () {
      const overflow = this.config.overflow
      return ['hidden', 'visible', 'scroll', 'auto'].includes(overflow) ? { overflow } : {}
    },
    iframeStyle () {
      const overflow = this.config.attributes?.overflow || 'auto'
      return { overflow }
    },
    iframeAttributes () {
      const attributes = this.config.attributes && typeof this.config.attributes === 'object'
        ? this.config.attributes
        : {}
      const blocked = ['src', 'style', 'class', 'frameborder', 'overflow']
      const safeAttributes = Object.fromEntries(
        Object.entries(attributes)
          .filter(([key]) => !blocked.includes(String(key).toLowerCase()))
          .map(([key, value]) => [key, payloadText(value)])
      )
      return {
        scrolling: 'auto',
        ...safeAttributes
      }
    },
    stateStyle () {
      if (this.widgetType === 'fader') {
        return this.currentRange.color ? { color: this.currentRange.color } : {}
      }
      return this.currentState.color || this.currentRange.color
        ? { color: this.currentState.color || this.currentRange.color }
        : {}
    },
    indicatorStyle () {
      const color = this.currentState.color || '#7f8790'
      return {
        '--bp-state-color': color,
        color,
        borderColor: color
      }
    },
    buttonText () {
      return configuredText(this.config, this.config.value)
    },
    buttonIcon () {
      return configuredIcon(this.config, 'touch_app', this.buttonText)
    },
    lastUpdateText () {
      if (!this.lastSeen) {
        return '-'
      }
      const elapsed = Math.max(0, Math.round((this.ticker - this.lastSeen) / 1000))
      if (elapsed < 60) {
        return '0 minutes ago'
      }
      if (elapsed < 3600) {
        return `${Math.round(elapsed / 60)} minutes ago`
      }
      if (elapsed < 86400) {
        return `${Math.round(elapsed / 3600)} hours ago`
      }
      return `${Math.round(elapsed / 86400)} days ago`
    }
  },
  watch: {
    message: {
      deep: true,
      immediate: true,
      handler (msg) {
        if (msg && Object.prototype.hasOwnProperty.call(msg, 'payload')) {
          this.lastSeen = Date.now()
          this.sending = false
          this.pending = false
          if (this.widgetType === 'fader' && Number.isFinite(this.numericValue)) {
            this.faderValue = this.numericValue
          }
        }
      }
    },
    messages: {
      deep: true,
      immediate: true,
      handler () {
        this.syncStoredMessage()
      }
    }
  },
  created () {
    this.$dataTracker(this.id, this.handleIncomingMessage)
  },
  mounted () {
    this.ensureMaterialIcons()
    this.syncStoredMessage()

    this.tickInterval = setInterval(() => {
      this.ticker = Date.now()
    }, 30000)
    if (Number.isFinite(this.numericValue)) {
      this.faderValue = this.numericValue
    } else {
      this.faderValue = this.min
    }
  },
  unmounted () {
    clearInterval(this.tickInterval)
    clearTimeout(this.liveTimer)
    clearTimeout(this.sendingTimer)
    clearTimeout(this.dialogTimer)
  },
  methods: {
    syncStoredMessage () {
      const stored = this.messages?.[this.id]
      if (stored && Object.prototype.hasOwnProperty.call(stored, 'payload')) {
        this.latestMsg = {
          ...stored,
          ...(this.latestMsg || {})
        }
      }
    },
    handleIncomingMessage (msg) {
      if (!msg) {
        this.latestMsg = {}
        return
      }
      if (Object.prototype.hasOwnProperty.call(msg, 'payload')) {
        this.latestMsg = msg
        return
      }
      this.latestMsg = {
        ...this.message,
        ...msg
      }
    },
    formatFaderValue (value) {
      const formatter = payloadText(this.config.value_as)
      if (!formatter) {
        return payloadText(value)
      }
      if (formatter === 's2DHHMMSS') {
        return formatSeconds(value, true)
      }
      if (formatter === 's2DHHMM') {
        return formatSeconds(value, false)
      }
      return formatter.replaceAll('{value}', payloadText(value))
    },
    ensureMaterialIcons () {
      const id = 'buttonpanel-material-icons'
      if (document.getElementById(id)) {
        return
      }
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
      document.head.appendChild(link)
    },
    rangeFor (value) {
      if (Number.isFinite(value)) {
        const match = this.ranges.find(item => {
          const start = Number(item.range?.[0])
          const end = Number(item.range?.[1])
          return start <= value && value <= end
        })
        if (match) {
          return match
        }
      }
      const text = configuredText(this.config, 'unknown')
      return {
        text,
        icon: configuredIcon(this.config, 'do_not_disturb', text),
        color: this.config.color || undefined
      }
    },
    defaultStateIcon (item) {
      const value = `${item.text || ''} ${item.value || ''}`.toLowerCase()
      if (value.includes('on') || value.includes('true')) return 'toggle_on'
      if (value.includes('off') || value.includes('false')) return 'toggle_off'
      return this.widgetType === 'select' ? 'radio_button_unchecked' : 'help_center'
    },
    defaultStateColor (item) {
      const value = `${item.text || ''} ${item.value || ''}`.toLowerCase()
      if (value.includes('on') || value.includes('true')) return '#52D017'
      if (value.includes('off') || value.includes('false')) return '#7f8790'
      return undefined
    },
    handleClick () {
      if (this.disabled || !this.isActionable || this.pending || this.sending) {
        return
      }
      if (this.widgetType === 'button') {
        this.sendWithOptionalConfirm({
          payload: this.config.value,
          ...(this.config.topic ? { topic: this.config.topic } : {})
        }, this.config.confirm, pinLengthFrom(this.config.confirm_pin), this.config.input_timeout, this.shouldWaitForInput)
      } else if (this.widgetType === 'image') {
        this.sendWithOptionalConfirm({
          payload: this.config.value,
          ...(this.config.topic ? { topic: this.config.topic } : {})
        }, this.config.confirm, pinLengthFrom(this.config.confirm_pin), this.config.input_timeout, this.shouldWaitForInput)
      } else if (this.widgetType === 'text') {
        this.editValue = this.hasValue ? this.displayValue : ''
        this.modal = 'value'
        this.startDialogTimeout(this.config.input_timeout)
      } else if (this.widgetType === 'switch') {
        const currentIndex = this.configuredStates.findIndex(item => item.valueText === this.currentState.valueText)
        const next = this.configuredStates[(currentIndex + 1) % this.configuredStates.length]
        this.sendWithOptionalConfirm({
          payload: next.value,
          ...(next.topic ? { topic: next.topic } : {})
        }, next.confirm, next.confirmPin, next.inputTimeout)
      } else if (this.widgetType === 'select') {
        this.modal = 'select'
        this.startDialogTimeout(this.config.input_timeout)
      } else if (this.widgetType === 'fader') {
        this.faderValue = Number.isFinite(this.numericValue) ? this.numericValue : this.min
        this.modal = 'fader'
        this.startDialogTimeout(this.config.input_timeout)
      }
    },
    sendSelection (option) {
      this.closeModal(false)
      this.sendWithOptionalConfirm({
        payload: option.value,
        ...(option.topic ? { topic: option.topic } : {})
      }, option.confirm, option.confirmPin, option.inputTimeout, this.shouldWaitForInput)
    },
    sendWithOptionalConfirm (msg, confirm, confirmPin = 0, inputTimeout = this.config.input_timeout, waitsForFeedback = this.shouldWaitForInput) {
      if (confirmPin > 0) {
        this.pinMessage = msg
        this.pinWaits = waitsForFeedback
        this.pinLength = confirmPin
        this.pinValue = ''
        this.confirmMessage = confirm || ''
        this.confirmCallback = null
        this.modal = 'pin'
        this.startDialogTimeout(inputTimeout)
        return
      }
      if (confirm) {
        this.confirmMessage = confirm
        this.confirmCallback = () => this.emitAction(msg, waitsForFeedback)
        this.modal = 'confirm'
        this.startDialogTimeout(inputTimeout)
      } else {
        this.emitAction(msg, waitsForFeedback)
      }
    },
    appendPinDigit (digit) {
      if (this.pinValue.length >= this.pinLength) {
        return
      }
      this.pinValue += String(digit)
      this.resetInputTimeout()
      if (this.pinValue.length >= this.pinLength) {
        const message = this.pinMessage
        const pin = this.pinValue
        this.closeModal(false)
        if (message) {
          this.emitAction({
            ...message,
            pin
          }, this.pinWaits)
        }
      }
    },
    removePinDigit () {
      if (!this.pinValue) {
        return
      }
      this.pinValue = this.pinValue.slice(0, -1)
      this.resetInputTimeout()
    },
    confirmProceed () {
      const callback = this.confirmCallback
      this.closeModal(false)
      if (callback) {
        callback()
      }
    },
    emitAction (msg, waitsForFeedback = this.shouldWaitForInput) {
      clearTimeout(this.sendingTimer)
      this.sending = true
      this.pending = false
      const output = { ...msg }
      if (hasConfiguredValue(output.topic)) {
        output._buttonpanel_topic = output.topic
      } else {
        delete output.topic
      }
      this.$socket.emit('widget-action', this.id, output)
      this.sendingTimer = setTimeout(() => {
        this.sending = false
        this.pending = waitsForFeedback
      }, 250)
    },
    commitValue () {
      this.closeModal(false)
      this.sendWithOptionalConfirm(
        {
          payload: this.editValue,
          ...(this.config.topic ? { topic: this.config.topic } : {})
        },
        this.config.confirm,
        pinLengthFrom(this.config.confirm_pin)
      )
    },
    timeoutSeconds (value) {
      const seconds = Number(value)
      return Number.isFinite(seconds) && seconds > 0 ? seconds : 0
    },
    startDialogTimeout (value) {
      clearTimeout(this.dialogTimer)
      const seconds = this.timeoutSeconds(value)
      if (!seconds) {
        return
      }
      this.dialogTimer = setTimeout(() => {
        this.closeModal(false)
      }, seconds * 1000)
    },
    resetInputTimeout () {
      this.startDialogTimeout(this.config.input_timeout)
    },
    closeModal () {
      clearTimeout(this.dialogTimer)
      this.dialogTimer = null
      this.modal = null
      this.confirmCallback = null
      this.confirmMessage = ''
      this.pinMessage = null
      this.pinWaits = true
      this.pinLength = 0
      this.pinValue = ''
    },
    faderEventValue (event) {
      const value = Number(event?.target?.value ?? this.faderValue)
      if (!Number.isFinite(value)) {
        return null
      }
      this.faderValue = value
      return value
    },
    isLiveFader () {
      return this.config.live === true || this.config.live === 'true'
    },
    emitFaderValue (value) {
      if (!Number.isFinite(Number(value))) {
        return
      }
      this.emitAction({
        payload: value,
        ...(this.config.topic ? { topic: this.config.topic } : {})
      })
    },
    handleFaderInput (event) {
      this.resetInputTimeout()
      const value = this.faderEventValue(event)
      if (value === null || !this.isLiveFader()) {
        return
      }
      this.lastLiveValue = value
      if (this.liveTimer) {
        return
      }
      this.liveTimer = setTimeout(() => {
        const liveValue = this.lastLiveValue
        this.liveTimer = null
        this.lastLiveValue = null
        this.emitFaderValue(liveValue)
      }, 200)
    },
    commitFader (event) {
      const value = this.faderEventValue(event)
      this.closeModal(false)
      if (value === null) {
        this.lastLiveValue = null
        return
      }
      if (this.isLiveFader()) {
        if (this.liveTimer) {
          clearTimeout(this.liveTimer)
          this.liveTimer = null
        }
        this.lastLiveValue = null
        this.emitFaderValue(value)
        return
      }
      if (this.lastLiveValue !== value) {
        this.sendWithOptionalConfirm(
          {
            payload: value,
            ...(this.config.topic ? { topic: this.config.topic } : {})
          },
          this.config.confirm,
          pinLengthFrom(this.config.confirm_pin)
        )
      }
      this.lastLiveValue = null
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.bp-widget {
  --bp-font-color: #aaa;
  --bp-title-color: #bdbdbd;
  --bp-font-muted: #969696;
  --bp-bg: #32383e;
  --bp-bg-disabled: #232628;
  --bp-disabled-color: #606060;
  --bp-meter-bg: #444;
  --bp-fader-empty: #25292d;
  --bp-waiting: #f89406;
  --bp-sending: #26c6da;
  --bp-active: #26c6da;

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  min-height: 65px;
  height: 100%;
  box-sizing: border-box;
  padding: 6px 6px 14px;
  overflow: hidden;
  border-radius: 4px;
  border: 0;
  background: var(--bp-bg);
  color: var(--bp-font-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  line-height: 1.25;
  user-select: none;
}

.bp-title {
  width: 100%;
  flex: 0 0 auto;
  overflow: hidden;
  text-align: left;
  color: var(--bp-title-color);
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: clip;
}

.bp-main {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  min-height: 0;
  gap: 4px;
  padding-top: 0;
  color: #f5f5f5;
  font-size: 1.25rem;
}

.bp-icon,
.bp-button-icon,
.bp-text-quote {
  display: inline-block;
  font-family: "Material Icons", sans-serif;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  text-align: center;
  text-transform: none;
  letter-spacing: normal;
  white-space: nowrap;
  direction: ltr;
  word-wrap: normal;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "liga";
  text-rendering: optimizeLegibility;
}

.bp-icon {
  min-width: 26px;
  font-size: 32px;
}

.bp-text,
.bp-text-value {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
}

.bp-text-body {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  min-height: 0;
  gap: 4px;
  padding-top: 0;
}

.bp-text-quote {
  min-width: 26px;
  font-size: 32px;
}

.bp-text-value {
  padding-top: 1px;
  color: #fff;
  font-size: 1.25rem;
  line-height: 1.2;
}

.bp-state-body {
  gap: 4px;
  padding-top: 0;
}

.bp-state-indicator {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 34px;
  border: 0;
  background: transparent;
}

.bp-state-indicator .bp-icon {
  min-width: 0;
  font-size: 34px;
}

.bp-state-text {
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: none;
}

.bp-select-caret {
  margin-left: auto;
  color: var(--bp-font-muted);
  font-size: 22px;
}

.bp-button-body {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 4px;
  min-width: 0;
  min-height: 0;
  padding-top: 0;
  border: 0;
  background: transparent;
}

.bp-button-icon {
  flex: 0 0 auto;
  min-width: 26px;
  font-size: 31px;
}

.bp-button-text {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  font-size: 1.25rem;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: clip;
}

.bp-gauge-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content;
  align-items: center;
  align-content: center;
  padding-right: 0;
}

.bp-gauge-metered {
  padding-right: 26px;
}

.bp-gauge-meta {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 4px;
}

.bp-gauge-label {
  min-width: 0;
  font-weight: 400;
}

.bp-number {
  grid-column: 2;
  justify-self: end;
  min-width: 3ch;
  max-width: 100%;
  padding-right: 0;
  overflow: hidden;
  color: #bdbdbd;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: right;
  text-overflow: clip;
  white-space: nowrap;
}

.bp-last-update {
  position: absolute;
  right: 6px;
  bottom: 4px;
  color: var(--bp-font-muted);
  font-size: 9px;
}

.bp-clickable {
  cursor: pointer;
}

.bp-clickable:hover {
  cursor: pointer;
  filter: brightness(1.05);
}

.bp-disabled {
  background: var(--bp-bg-disabled);
  color: var(--bp-disabled-color);
  cursor: not-allowed;
  filter: none;
}

.bp-disabled .bp-title,
.bp-disabled .bp-last-update,
.bp-disabled .bp-icon,
.bp-disabled .bp-button-icon,
.bp-disabled .bp-text-quote,
.bp-disabled .bp-text,
.bp-disabled .bp-text-value,
.bp-disabled .bp-state-text,
.bp-disabled .bp-gauge-label,
.bp-disabled .bp-number,
.bp-disabled .bp-button-body,
.bp-disabled .bp-button-text {
  color: var(--bp-disabled-color) !important;
}

.bp-disabled .bp-state-indicator {
  color: var(--bp-disabled-color) !important;
  border-color: var(--bp-disabled-color) !important;
  background-color: transparent !important;
}

.bp-disabled .bp-meter > span {
  background-color: var(--bp-disabled-color) !important;
}

.bp-active {
  outline: 2px solid var(--bp-active);
  outline-offset: -2px;
}

.bp-sending {
  outline: 2px solid var(--bp-sending);
  outline-offset: -2px;
  cursor: progress;
}

.bp-pending {
  outline: 2px solid var(--bp-waiting);
  outline-offset: -2px;
  background: #35383a;
  cursor: wait;
}

.bp-sending > :not(.bp-status-overlay):not(.bp-modal-backdrop),
.bp-pending > :not(.bp-status-overlay):not(.bp-modal-backdrop) {
  opacity: 0.46;
}

.bp-status-overlay {
  position: absolute;
  right: 7px;
  top: 7px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 4px 6px;
  border-radius: 3px;
  color: #1f2124;
  background: var(--bp-waiting);
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
}

.bp-sending .bp-status-overlay {
  background: var(--bp-sending);
}

.bp-spinner {
  width: 11px;
  height: 11px;
  border: 2px solid rgba(31, 33, 36, 0.35);
  border-top-color: #1f2124;
  border-radius: 50%;
  animation: bp-spin 0.8s linear infinite;
}

.bp-unknown-state {
  opacity: 0.78;
}

.bp-meter {
  position: absolute;
  top: 9px;
  right: 7px;
  width: 20px;
  height: calc(100% - 26px);
  border: 1px solid rgba(0, 0, 0, 0.45);
  background: var(--bp-meter-bg);
}

@keyframes bp-spin {
  to {
    transform: rotate(360deg);
  }
}

.bp-meter > span {
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
}

.bp-image {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  min-height: 0;
  margin-top: 6px;
  overflow: hidden;
  line-height: 1.2;
}

.bp-image img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  margin: 0;
  object-fit: contain;
  object-position: center center;
}

.bp-media-frame {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  margin-top: 6px;
  overflow: hidden;
}

.bp-media-frame .bp-image,
.bp-media-frame .bp-iframe {
  margin-top: 0;
}

.bp-iframe {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  height: 100%;
  margin-top: 6px;
  border: 0;
  overflow: auto;
}

.bp-media-disabled {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(36, 39, 42, 0.56);
  backdrop-filter: saturate(0.8) blur(1px);
  pointer-events: none;
}

.bp-unknown {
  align-self: flex-start;
  padding-top: 2px;
  color: var(--bp-font-muted);
  font-size: 1rem;
  line-height: 1.2;
}

.bp-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.bp-modal {
  position: relative;
  min-width: 330px;
  max-width: min(90vw, 420px);
  padding: 18px;
  border-radius: 4px;
  background: #272b30;
  color: #ddd;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

.bp-modal-title {
  margin-bottom: 12px;
  color: #f5f5f5;
  font-weight: 700;
}

.bp-modal-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  min-height: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.bp-modal-close span,
.bp-modal-close::before {
  position: absolute;
  top: 11px;
  left: 3px;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: #ddd;
  content: "";
}

.bp-modal-close span {
  transform: rotate(45deg);
}

.bp-modal-close::before {
  transform: rotate(-45deg);
}

.bp-modal-close:hover span,
.bp-modal-close:hover::before {
  background: #fff;
}

.bp-modal-actions,
.bp-select-list {
  display: grid;
  gap: 8px;
}

.bp-modal-actions {
  grid-template-columns: 1fr 1fr;
  margin-top: 16px;
}

.bp-modal-actions button,
.bp-select-list button {
  min-height: 57px;
  padding: 9px 15px;
  border: 1px solid #151719;
  border-radius: 4px;
  background: #3a3f44;
  color: #f5f5f5;
  font-size: 1.05rem;
  cursor: pointer;
}

.bp-select-list button {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
  padding: 9px 15px;
}

.bp-value-modal {
  display: grid;
  gap: 12px;
  min-width: 240px;
}

.bp-value-input {
  width: 100%;
  min-height: 40px;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid #151719;
  border-radius: 4px;
  outline: none;
  background: #32383e;
  color: #fff;
  font: inherit;
}

.bp-value-input:focus {
  border-color: #888;
  box-shadow: 0 0 0 1px #888;
}

.bp-pin-modal {
  display: grid;
  gap: 14px;
  min-width: 240px;
  padding-top: 2px;
}

.bp-pin-message {
  padding-right: 18px;
  color: #f5f5f5;
  line-height: 1.35;
}

.bp-pin-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 4px 0 6px;
}

.bp-pin-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #50565d;
  box-shadow: inset 0 0 0 1px #181a1c;
}

.bp-pin-dots span.bp-pin-dot-filled {
  background: #f0f36a;
  box-shadow: 0 0 8px rgba(240, 243, 106, 0.55);
}

.bp-pin-keypad {
  display: grid;
  grid-template-columns: repeat(3, 52px);
  gap: 8px;
  justify-content: center;
}

.bp-pin-keypad button {
  width: 52px;
  height: 44px;
  border: 1px solid #151719;
  border-radius: 4px;
  background: #3a3f44;
  color: #f5f5f5;
  font: inherit;
  font-size: 1.2rem;
  cursor: pointer;
}

.bp-pin-keypad button:hover {
  background: #474d53;
}

.bp-pin-keypad .bp-pin-key-blank {
  visibility: hidden;
  cursor: default;
}

.bp-pin-keypad .bp-pin-backspace {
  font-family: "Material Icons", sans-serif;
  font-size: 1.35rem;
}

.bp-fader-modal {
  --bp-fader-track-left: 52px;
  --bp-fader-track-top: 42px;
  --bp-fader-track-width: 48px;
  --bp-fader-track-height: 320px;

  position: relative;
  width: 170px;
  height: 428px;
  margin: 0 auto;
}

.bp-fader-modal input {
  position: absolute;
  top: calc(var(--bp-fader-track-top) + (var(--bp-fader-track-height) - var(--bp-fader-track-width)) / 2);
  left: calc(var(--bp-fader-track-left) - (var(--bp-fader-track-height) - var(--bp-fader-track-width)) / 2);
  width: var(--bp-fader-track-height);
  height: var(--bp-fader-track-width);
  border: 1px solid #232628;
  background-color: var(--bp-fader-color);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  cursor: pointer;
  opacity: 1;
  outline: none;
  touch-action: none;
  transform-origin: 50% 50%;
  transform:rotate(270deg);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.bp-fader-modal input:hover,
.bp-fader-modal input:active {
  opacity: 1;
}

.bp-fader-modal input::-webkit-slider-runnable-track {
  width: var(--bp-fader-track-height);
  height: var(--bp-fader-track-width);
  border: 0;
  background: transparent;
}

.bp-fader-modal input::-moz-range-track {
  width: var(--bp-fader-track-height);
  height: var(--bp-fader-track-width);
  border: 0;
  background: transparent;
}

.bp-fader-modal input::-webkit-slider-thumb {
  width: 30px;
  height: 60px;
  margin-top: -6px;
  border: 0;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.bp-fader-modal input::-moz-range-thumb {
  width: 30px;
  height: 60px;
  border: 0;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  -moz-appearance: none;
}

.bp-fader-meta {
  position: absolute;
  top: 374px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.bp-fader-value {
  position: absolute;
  top: 190px;
  right: 146px;
  font-size: 1.2rem;
}

.bp-fader-bounds {
  position: absolute;
  top: var(--bp-fader-track-top);
  left: 136px;
  height: var(--bp-fader-track-height);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #aaa;
}
</style>
