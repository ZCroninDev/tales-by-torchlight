<script setup lang="ts">
interface Character {
  name: string
  race: string
  class: string
  background: string
  level: number
  abilityScores: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  hitPoints: number
  armorClass: number
  proficiencyBonus: number
  skills: string[]
  equipment: string[]
}

interface Props {
  character: Character
}

const props = defineProps<Props>()

// Calculate ability score modifiers
const getModifier = (score: number) => {
  return Math.floor((score - 10) / 2)
}

// Format modifier with + or - sign
const formatModifier = (modifier: number) => {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`
}

// Calculate saving throw bonuses (assumes proficiency in certain saves based on class)
const getSavingThrowBonus = (ability: string) => {
  const modifier = getModifier(props.character.abilityScores[ability as keyof typeof props.character.abilityScores])
  // This is simplified - in reality, proficiency depends on class
  const isProficient = isClassProficient(ability)
  return modifier + (isProficient ? props.character.proficiencyBonus : 0)
}

const isClassProficient = (ability: string) => {
  const classProficiencies: { [key: string]: string[] } = {
    'Fighter': ['strength', 'constitution'],
    'Wizard': ['intelligence', 'wisdom'],
    'Rogue': ['dexterity', 'intelligence'],
    'Cleric': ['wisdom', 'charisma'],
    'Ranger': ['strength', 'dexterity'],
    'Paladin': ['wisdom', 'charisma'],
    'Barbarian': ['strength', 'constitution'],
    'Bard': ['dexterity', 'charisma'],
    'Druid': ['intelligence', 'wisdom'],
    'Monk': ['strength', 'dexterity'],
    'Sorcerer': ['constitution', 'charisma'],
    'Warlock': ['wisdom', 'charisma']
  }
  return classProficiencies[props.character.class]?.includes(ability) || false
}

// Calculate skill bonuses (simplified)
const getSkillBonus = (skill: string) => {
  const skillAbilities: { [key: string]: keyof typeof props.character.abilityScores } = {
    'Acrobatics': 'dexterity',
    'Animal Handling': 'wisdom',
    'Arcana': 'intelligence',
    'Athletics': 'strength',
    'Deception': 'charisma',
    'History': 'intelligence',
    'Insight': 'wisdom',
    'Intimidation': 'charisma',
    'Investigation': 'intelligence',
    'Medicine': 'wisdom',
    'Nature': 'intelligence',
    'Perception': 'wisdom',
    'Performance': 'charisma',
    'Persuasion': 'charisma',
    'Religion': 'intelligence',
    'Sleight of Hand': 'dexterity',
    'Stealth': 'dexterity',
    'Survival': 'wisdom'
  }
  
  const ability = skillAbilities[skill]
  if (!ability) return 0
  
  const modifier = getModifier(props.character.abilityScores[ability])
  const isProficient = props.character.skills.includes(skill)
  return modifier + (isProficient ? props.character.proficiencyBonus : 0)
}

const allSkills = [
  'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
  'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
  'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
  'Sleight of Hand', 'Stealth', 'Survival'
]
</script>

<template>
  <div class="bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-600 p-6 text-white">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Character Header -->
        <div class="text-center border-b border-gray-600 pb-4">
          <h1 class="text-3xl font-bold text-yellow-400 mb-2">{{ character.name }}</h1>
          <p class="text-lg text-gray-300">
            Level {{ character.level }} {{ character.race }} {{ character.class }}
          </p>
          <p class="text-gray-400">{{ character.background }}</p>
        </div>

        <!-- Core Stats -->
        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="bg-gray-700/50 rounded-lg p-3">
            <div class="text-2xl font-bold text-red-400">{{ character.hitPoints }}</div>
            <div class="text-sm text-gray-400">Hit Points</div>
          </div>
          <div class="bg-gray-700/50 rounded-lg p-3">
            <div class="text-2xl font-bold text-blue-400">{{ character.armorClass }}</div>
            <div class="text-sm text-gray-400">Armor Class</div>
          </div>
          <div class="bg-gray-700/50 rounded-lg p-3">
            <div class="text-2xl font-bold text-green-400">+{{ character.proficiencyBonus }}</div>
            <div class="text-sm text-gray-400">Proficiency Bonus</div>
          </div>
        </div>

        <!-- Ability Scores -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-yellow-400">Ability Scores</h3>
          <div class="grid grid-cols-2 gap-3">
            <div 
              v-for="(score, ability) in character.abilityScores" 
              :key="ability"
              class="bg-gray-700/50 rounded-lg p-3 flex justify-between items-center"
            >
              <span class="capitalize font-medium">{{ ability }}</span>
              <div class="text-right">
                <div class="text-lg font-bold">{{ score }}</div>
                <div class="text-sm text-gray-400">{{ formatModifier(getModifier(score)) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Saving Throws -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-yellow-400">Saving Throws</h3>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div 
              v-for="(score, ability) in character.abilityScores" 
              :key="`save-${ability}`"
              class="flex justify-between items-center py-1"
            >
              <span class="capitalize">{{ ability }}:</span>
              <span 
                class="font-mono"
                :class="{ 'text-green-400 font-semibold': isClassProficient(ability) }"
              >
                {{ formatModifier(getSavingThrowBonus(ability)) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Skills -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-yellow-400">Skills</h3>
          <div class="grid grid-cols-1 gap-1 text-sm max-h-64 overflow-y-auto">
            <div 
              v-for="skill in allSkills" 
              :key="skill"
              class="flex justify-between items-center py-1"
            >
              <span 
                :class="{ 'text-green-400 font-semibold': character.skills.includes(skill) }"
              >
                {{ skill }}:
              </span>
              <span 
                class="font-mono"
                :class="{ 'text-green-400 font-semibold': character.skills.includes(skill) }"
              >
                {{ formatModifier(getSkillBonus(skill)) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Equipment -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-yellow-400">Equipment</h3>
          <div class="bg-gray-700/30 rounded-lg p-3">
            <div v-if="character.equipment.length > 0" class="space-y-1">
              <div v-for="item in character.equipment" :key="item" class="text-sm">
                • {{ item }}
              </div>
            </div>
            <div v-else class="text-gray-400 text-sm italic">
              No equipment listed
            </div>
          </div>
        </div>

        <!-- Combat Stats -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-yellow-400">Combat</h3>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="bg-gray-700/50 rounded-lg p-3 text-center">
              <div class="font-bold">{{ formatModifier(getModifier(character.abilityScores.dexterity)) }}</div>
              <div class="text-gray-400">Initiative</div>
            </div>
            <div class="bg-gray-700/50 rounded-lg p-3 text-center">
              <div class="font-bold">{{ 10 + getModifier(character.abilityScores.wisdom) }}</div>
              <div class="text-gray-400">Passive Perception</div>
            </div>
          </div>
        </div>

        <!-- Character Features -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-yellow-400">Features & Traits</h3>
          <div class="bg-gray-700/30 rounded-lg p-3 text-sm space-y-2">
            <div class="text-green-400 font-medium">Racial Traits</div>
            <div class="text-gray-300 italic">Based on {{ character.race }} heritage</div>
            
            <div class="text-blue-400 font-medium pt-2">Class Features</div>
            <div class="text-gray-300 italic">Level {{ character.level }} {{ character.class }} abilities</div>
            
            <div class="text-purple-400 font-medium pt-2">Background</div>
            <div class="text-gray-300 italic">{{ character.background }} background benefits</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>