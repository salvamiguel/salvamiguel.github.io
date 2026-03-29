<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

interface HistoryEntry {
  type: 'command' | 'output' | 'output-html'
  text: string
}

const history = ref<HistoryEntry[]>([])
const inputValue = ref('')
const isAnimating = ref(false)
const terminalBody = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

function pushOutput(text: string) {
  history.value.push({ type: 'output', text })
  scrollToBottom()
}

function pushHtml(html: string) {
  history.value.push({ type: 'output-html', text: html })
  scrollToBottom()
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// --- Command handlers ---

async function cmdHelp() {
  pushHtml(`<span class="text-accent">Available commands:</span>
  help          Show this help message
  ls            List project files
  cd            Change directory
  whoami        Who am I?
  cat skills.json   View my skills
  terraform apply   Deploy infrastructure
  rm -rf /      Delete everything
  sudo          Elevate privileges
  docker run    Run a container
  git push --force  Push to production
  kubectl delete pod  Delete a pod
  ping google.com    Test connectivity
  npm install   Install dependencies
  python        Start Python REPL
  curl          Make a request
  aws s3 ls     List S3 buckets
  exit          Exit terminal
  clear         Clear terminal`)
}

function cmdLs() {
  pushOutput(`bun.lock    index.html   package.json  src          vite.config.ts
dist        docs         node_modules  public       tsconfig.json`)
}

function cmdCd() {
  pushOutput('Where are you going?')
}

function cmdWhoami() {
  pushOutput('> @salvamiguel')
}

function cmdCatSkills() {
  pushHtml(`<pre class="text-xs leading-relaxed">{
  "cloud": ["AWS", "GCP", "Azure"],
  "iac": ["Terraform", "Ansible", "Crossplane"],
  "languages": ["Python", "TypeScript", "PHP"],
  "ai": ["Azure OpenAI", "AWS Bedrock"]
}</pre>`)
}

function cmdRmRf() {
  pushOutput('No fucking way')
}

function cmdSudo() {
  pushOutput('Nice try.')
}

function cmdDockerRun() {
  pushOutput('Error: container escaped. It\'s living its best life now. 🐳')
}

function cmdGitPushForce() {
  pushOutput('To production? On a Friday? Bold.')
}

function cmdKubectlDeletePod() {
  pushOutput('Pod deleted. Just kidding. I\'m not that reckless.')
}

function cmdPing() {
  pushOutput('64 bytes from google.com: time=0.001ms — yes, I\'m that fast')
}

function cmdExit() {
  pushOutput('There is no escape. Welcome to my portfolio.')
}

function cmdPython() {
  pushOutput('>>> import antigravity — Sorry, this terminal doesn\'t fly.')
}

function cmdCurl() {
  pushHtml(`<pre class="text-xs leading-relaxed text-accent">┌─────────────────────────────────┐
│  HTTP/1.1 200 OK                │
│  Content-Type: portfolio/awesome│
│                                 │
│  { "status": "hired?" }         │
└─────────────────────────────────┘</pre>`)
}

function cmdAwsS3() {
  pushOutput('AccessDenied: You need at least 3 certifications to access this bucket.')
}

async function cmdNpmInstall() {
  isAnimating.value = true
  const frames = ['▓░░░░░░░░░', '▓▓▓░░░░░░░', '▓▓▓▓▓░░░░░', '▓▓▓▓▓▓▓░░░', '▓▓▓▓▓▓▓▓▓░', '▓▓▓▓▓▓▓▓▓▓']
  const entry: HistoryEntry = { type: 'output', text: `Installing... ${frames[0]}` }
  history.value.push(entry)
  scrollToBottom()

  for (let i = 1; i < frames.length; i++) {
    await delay(350)
    entry.text = `Installing... ${frames[i]}`
  }
  await delay(400)
  entry.text = 'added 9,847 packages in 0.3s\n\n42 vulnerabilities (12 moderate, 28 high, 2 critical)\n\nrun `npm audit fix` to fix them (just kidding, good luck)'
  scrollToBottom()
  isAnimating.value = false
}

async function cmdTerraformApply() {
  isAnimating.value = true

  pushHtml('<span class="text-accent">Initializing Terraform...</span>')
  await delay(800)

  pushOutput('Terraform will perform the following actions:')
  await delay(400)

  const resources = [
    { name: 'aws_instance.portfolio', action: 'create' },
    { name: 'aws_cloudfront_distribution.cdn', action: 'create' },
    { name: 'aws_route53_record.dns', action: 'create' },
  ]

  for (const r of resources) {
    pushHtml(`  <span class="text-[#27C93F]">+</span> ${r.name} will be <span class="text-[#27C93F]">created</span>`)
    await delay(300)
  }

  await delay(400)
  pushOutput('\nPlan: 3 to add, 0 to change, 0 to destroy.')
  await delay(600)

  pushHtml('\n<span class="text-accent">Applying...</span>')
  await delay(500)

  for (const r of resources) {
    pushHtml(`${r.name}: <span class="text-[#FFBD2E]">Creating...</span>`)
    await delay(700)
    history.value[history.value.length - 1] = {
      type: 'output-html',
      text: `${r.name}: <span class="text-[#27C93F]">Creation complete after ${(Math.random() * 3 + 1).toFixed(0)}s</span>`
    }
    scrollToBottom()
  }

  await delay(400)
  pushHtml('\n<span class="text-[#27C93F]">Apply complete! Resources: 3 added, 0 changed, 0 destroyed.</span>')
  isAnimating.value = false
}

function cmdClear() {
  history.value = []
}

function cmdNotFound(cmd: string) {
  pushOutput(`command not found: ${cmd}. Type 'help' for available commands.`)
}

// --- Command router ---

const commands: Record<string, () => void | Promise<void>> = {
  'help': cmdHelp,
  'ls': cmdLs,
  'cd': cmdCd,
  'whoami': cmdWhoami,
  'cat skills.json': cmdCatSkills,
  'terraform apply': cmdTerraformApply,
  'rm -rf /': cmdRmRf,
  'rm -rf': cmdRmRf,
  'sudo': cmdSudo,
  'docker run': cmdDockerRun,
  'git push --force': cmdGitPushForce,
  'git push -f': cmdGitPushForce,
  'kubectl delete pod': cmdKubectlDeletePod,
  'kubectl delete': cmdKubectlDeletePod,
  'ping google.com': cmdPing,
  'ping': cmdPing,
  'exit': cmdExit,
  'python': cmdPython,
  'python3': cmdPython,
  'curl': cmdCurl,
  'aws s3 ls': cmdAwsS3,
  'aws': cmdAwsS3,
  'npm install': cmdNpmInstall,
  'npm i': cmdNpmInstall,
  'clear': cmdClear,
}

async function handleCommand() {
  const raw = inputValue.value.trim()
  inputValue.value = ''
  if (!raw) return

  history.value.push({ type: 'command', text: raw })
  scrollToBottom()

  // Exact match first, then prefix match
  const cmd = raw.toLowerCase()
  const handler = commands[cmd]
    ?? Object.entries(commands).find(([k]) => cmd.startsWith(k + ' '))?.[1]

  if (handler) {
    await handler()
  } else {
    cmdNotFound(raw)
  }

  nextTick(() => inputEl.value?.focus())
}

function focusInput() {
  if (!isAnimating.value) {
    inputEl.value?.focus()
  }
}

onMounted(() => {
  // Small delay so the terminal feels natural
  setTimeout(() => inputEl.value?.focus(), 500)
})
</script>

<template>
  <div
    class="rounded-lg border border-accent/30 bg-[#111] font-mono text-sm leading-relaxed overflow-hidden flex flex-col"
    @click="focusInput"
  >
    <!-- Title bar -->
    <div class="flex items-center gap-2 px-5 pt-5 pb-3">
      <span class="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
      <span class="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
      <span class="w-3 h-3 rounded-full bg-[#27C93F]"></span>
    </div>

    <!-- Scrollable body -->
    <div ref="terminalBody" class="p-5 pt-0 space-y-3 h-[380px] overflow-y-auto terminal-scroll">
      <!-- Static initial output -->
      <div>
        <span class="text-accent">$</span> <span class="text-[#E0E0E0]">whoami</span>
        <div class="text-[#A0A0A0] mt-1">&gt; @salvamiguel</div>
      </div>
      <div>
        <span class="text-accent">$</span> <span class="text-[#E0E0E0]">cat skills.json</span>
        <pre class="text-[#A0A0A0] mt-1 text-xs leading-relaxed">{
  "cloud": ["AWS", "GCP", "Azure"],
  "iac": ["Terraform", "Ansible", "Crossplane"],
  "languages": ["Python", "TypeScript", "PHP"],
  "ai": ["Azure OpenAI", "AWS Bedrock"]
}</pre>
      </div>
      <div>
        <span class="text-accent">$</span> <span class="text-[#E0E0E0]">uptime</span>
        <div class="text-[#A0A0A0] mt-1">&gt; 8 years building things that scale</div>
      </div>

      <!-- Dynamic command history -->
      <template v-for="(entry, i) in history" :key="i">
        <div v-if="entry.type === 'command'">
          <span class="text-accent">$</span> <span class="text-[#E0E0E0]">{{ entry.text }}</span>
        </div>
        <div v-else-if="entry.type === 'output'" class="text-[#A0A0A0] whitespace-pre-wrap">{{ entry.text }}</div>
        <div v-else-if="entry.type === 'output-html'" class="text-[#A0A0A0]" v-html="entry.text"></div>
      </template>

      <!-- Input line -->
      <div class="flex items-center">
        <span class="text-accent shrink-0">$</span>
        <div class="relative flex-1 ml-2">
          <input
            ref="inputEl"
            v-model="inputValue"
            :disabled="isAnimating"
            @keydown.enter="handleCommand"
            type="text"
            class="w-full bg-transparent text-[#E0E0E0] outline-none border-none caret-transparent font-mono text-sm"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <span
            v-if="!isAnimating"
            class="cursor-blink text-accent absolute top-0 pointer-events-none"
            :style="{ left: inputValue.length + 'ch' }"
          >_</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.cursor-blink {
  animation: blink 1s step-end infinite;
}

.terminal-scroll::-webkit-scrollbar {
  width: 4px;
}
.terminal-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.terminal-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}
</style>
