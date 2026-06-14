const fs = require('fs')

function fail (message) {
  throw new Error(message)
}

function readJson (file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

const pkg = readJson('package.json')

if (pkg.name !== '@sourcesimian/node-red-dashboard-2-buttonpanel') fail('package name must be @sourcesimian/node-red-dashboard-2-buttonpanel')
if (!pkg.author) fail('package author is required')
if (!pkg.repository || !pkg.repository.url) fail('repository.url is required')
if (!pkg.bugs || !pkg.bugs.url) fail('bugs.url is required')
if (!pkg.homepage) fail('homepage is required')
if (pkg.license !== 'MIT') fail('MIT license is required')
if (!pkg.keywords || !pkg.keywords.includes('node-red')) fail('node-red keyword is required')
if (!pkg.peerDependencies || !pkg.peerDependencies['@flowfuse/node-red-dashboard']) fail('@flowfuse/node-red-dashboard peerDependency is required')
if (!pkg['node-red'] || !pkg['node-red'].nodes || !pkg['node-red'].nodes['ui-buttonpanel']) fail('node-red.nodes metadata is required')
if (!pkg['node-red-dashboard-2'] || !pkg['node-red-dashboard-2'].widgets) fail('node-red-dashboard-2.widgets metadata is required')
if (pkg.exports) fail('package exports are not expected for this Node-RED package')
if (pkg.dependencies && (pkg.dependencies.vue || pkg.dependencies.vuex)) fail('vue and vuex should not be runtime dependencies')

require('child_process').execFileSync(process.execPath, ['-c', 'nodes/ui-buttonpanel.js'], { stdio: 'inherit' })

const html = fs.readFileSync('nodes/ui-buttonpanel.html', 'utf8')
const match = html.match(/<script type="text\/javascript">([\s\S]*?)<\/script>/)
if (!match) fail('editor script not found')
new Function(match[1])

for (const file of fs.readdirSync('examples').filter(file => file.endsWith('.json'))) {
  const flow = readJson(`examples/${file}`)
  for (const node of flow) {
    if (node.type === 'function') {
      new Function('msg', node.func || '')
    }
  }
}

readJson('package-lock.json')

console.log('package checks OK')
