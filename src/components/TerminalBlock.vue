<script setup lang="ts">
</script>

<template>
  <div class="rounded-lg border border-accent/30 bg-[#111] p-5 font-mono text-sm leading-relaxed overflow-hidden">
    <div class="flex items-center gap-2 mb-4">
      <span class="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
      <span class="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
      <span class="w-3 h-3 rounded-full bg-[#27C93F]"></span>
    </div>
    <div class="space-y-3">
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
      <div class="flex items-center">
        <span class="text-accent">$</span>
        <span class="cursor-blink text-accent ml-2">_</span>
      </div>
    </div>
  </div>
</template>
