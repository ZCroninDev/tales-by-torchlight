<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Character data structure
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

// D&D 5e data
const races = [
  { name: 'Human', traits: ['Versatile', '+1 to all abilities'] },
  { name: 'Elf', traits: ['Darkvision', 'Keen Senses', '+2 Dexterity'] },
  { name: 'Dwarf', traits: ['Darkvision', 'Dwarven Resilience', '+2 Constitution'] },
  { name: 'Halfling', traits: ['Lucky', 'Brave', '+2 Dexterity'] },
  { name: 'Dragonborn', traits: ['Draconic Ancestry', 'Breath Weapon', '+2 Strength, +1 Charisma'] },
  { name: 'Gnome', traits: ['Darkvision', 'Gnome Cunning', '+2 Intelligence'] },
  { name: 'Half-Elf', traits: ['Darkvision', 'Fey Ancestry', '+2 Charisma, +1 to two different abilities'] },
  { name: 'Half-Orc', traits: ['Darkvision', 'Relentless Endurance', '+2 Strength, +1 Constitution'] },
  { name: 'Tiefling', traits: ['Darkvision', 'Hellish Resistance', '+2 Charisma, +1 Intelligence'] }
]

const classes = [
  { name: 'Fighter', hitDie: 10, primaryAbility: 'Strength or Dexterity' },
  { name: 'Wizard', hitDie: 6, primaryAbility: 'Intelligence' },
  { name: 'Rogue', hitDie: 8, primaryAbility: 'Dexterity' },
  { name: 'Cleric', hitDie: 8, primaryAbility: 'Wisdom' },
  { name: 'Ranger', hitDie: 10, primaryAbility: 'Dexterity and Wisdom' },
  { name: 'Paladin', hitDie: 10, primaryAbility: 'Strength and Charisma' },
  { name: 'Barbarian', hitDie: 12, primaryAbility: 'Strength' },
  { name: 'Bard', hitDie: 8, primaryAbility: 'Charisma' },
  { name: 'Druid', hitDie: 8, primaryAbility: 'Wisdom' },
  { name: 'Monk', hitDie: 8, primaryAbility: 'Dexterity and Wisdom' },
  { name: 'Sorcerer', hitDie: 6, primaryAbility: 'Charisma' },
  { name: 'Warlock', hitDie: 8, primaryAbility: 'Charisma' }
]

const backgrounds = [
  'Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Charlatan', 
  'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander', 'Sailor'
]

// Reactive character data
const character = ref<Character>({
  name: '',
  race: '',
  class: '',
  background: '',
  level: 1,
  abilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  },
  hitPoints: 0,
  armorClass: 10,
  proficiencyBonus: 2,
  skills: [],
  equipment: []
})

const currentStep = ref(1)
const totalSteps = 6

// Generate random ability scores using 4d6 drop lowest method
const generateAbilityScores = () => {
  const rollAbilityScore = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
    rolls.sort((a, b) => b - a)
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0)
  }

  character.value.abilityScores = {
    strength: rollAbilityScore(),
    dexterity: rollAbilityScore(),
    constitution: rollAbilityScore(),
    intelligence: rollAbilityScore(),
    wisdom: rollAbilityScore(),
    charisma: rollAbilityScore()
  }
}

// Calculate ability score modifier
const getModifier = (score: number) => {
  return Math.floor((score - 10) / 2)
}

// Calculate derived stats
const calculateStats = () => {
  const selectedClass = classes.find(c => c.name === character.value.class)
  if (!selectedClass) return

  const conModifier = getModifier(character.value.abilityScores.constitution)
  character.value.hitPoints = selectedClass.hitDie + conModifier
  
  const dexModifier = getModifier(character.value.abilityScores.dexterity)
  character.value.armorClass = 10 + dexModifier
  
  character.value.proficiencyBonus = Math.ceil(character.value.level / 4) + 1
  
  // Generate equipment based on class and background
  character.value.equipment = generateEquipment()
  character.value.skills = generateSkills()
}

// Generate starting equipment based on class
const generateEquipment = () => {
  const classEquipment: { [key: string]: string[] } = {
    'Fighter': ['Chain mail', 'Shield', 'Longsword', 'Light crossbow and 20 bolts', 'Dungeoneer\'s pack'],
    'Wizard': ['Quarterstaff', 'Dagger', 'Component pouch', 'Scholar\'s pack', 'Spellbook', 'Two cantrips'],
    'Rogue': ['Studded leather armor', 'Shortsword', 'Shortbow and 20 arrows', 'Thieves\' tools', 'Burglar\'s pack'],
    'Cleric': ['Scale mail', 'Shield', 'Warhammer', 'Light crossbow and 20 bolts', 'Priest\'s pack', 'Holy symbol'],
    'Ranger': ['Studded leather armor', 'Shortsword', 'Longbow and 20 arrows', 'Dungeoneer\'s pack'],
    'Paladin': ['Chain mail', 'Shield', 'Longsword', 'Javelin (5)', 'Explorer\'s pack', 'Holy symbol'],
    'Barbarian': ['Leather armor', 'Shield', 'Greataxe', 'Handaxe (2)', 'Explorer\'s pack'],
    'Bard': ['Leather armor', 'Rapier', 'Shortbow and 20 arrows', 'Entertainer\'s pack', 'Lute', 'Dagger'],
    'Druid': ['Leather armor', 'Shield', 'Scimitar', 'Leather armor', 'Explorer\'s pack', 'Wooden shield'],
    'Monk': ['Shortsword', 'Dart (10)', 'Dungeoneer\'s pack'],
    'Sorcerer': ['Light crossbow and 20 bolts', 'Component pouch', 'Dungeoneer\'s pack', 'Two daggers'],
    'Warlock': ['Light armor', 'Simple weapon', 'Light crossbow and 20 bolts', 'Component pouch', 'Scholar\'s pack']
  }
  
  const baseEquipment = classEquipment[character.value.class] || ['Basic equipment']
  
  // Add background equipment
  const backgroundEquipment: { [key: string]: string[] } = {
    'Acolyte': ['Holy symbol', 'Prayer book', 'Incense sticks (5)', 'Vestments'],
    'Criminal': ['Crowbar', 'Dark common clothes', 'Belt pouch'],
    'Folk Hero': ['Smith\'s tools', 'Shovel', 'Artisan clothes'],
    'Noble': ['Signet ring', 'Fine clothes', 'Purse'],
    'Sage': ['Ink and quill', 'Parchment', 'Academic robes'],
    'Soldier': ['Insignia of rank', 'Playing cards', 'Common clothes'],
    'Charlatan': ['Disguise kit', 'Forgery kit', 'Signet ring of fictitious person'],
    'Entertainer': ['Musical instrument', 'Costume clothes', 'Love letter'],
    'Guild Artisan': ['Artisan tools', 'Letter of introduction', 'Traveler\'s clothes'],
    'Hermit': ['Herbalism kit', 'Scroll', 'Winter blanket'],
    'Outlander': ['Staff', 'Hunting trap', 'Traveler\'s clothes'],
    'Sailor': ['Navigator\'s tools', 'Rope (50 feet)', 'Common clothes']
  }
  
  const bgEquipment = backgroundEquipment[character.value.background] || []
  
  return [...baseEquipment, ...bgEquipment, 'Backpack', 'Bedroll', 'Mess kit', 'Tinderbox', 'Torch (10)', 'Rations (10 days)', 'Waterskin', 'Hemp rope (50 feet)']
}

// Generate starting skills based on class and background
const generateSkills = () => {
  const classSkills: { [key: string]: string[] } = {
    'Fighter': ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
    'Wizard': ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
    'Rogue': ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'],
    'Cleric': ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
    'Ranger': ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
    'Paladin': ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
    'Barbarian': ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'],
    'Bard': ['Deception', 'History', 'Investigation', 'Persuasion', 'Sleight of Hand'],
    'Druid': ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
    'Monk': ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
    'Sorcerer': ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
    'Warlock': ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion']
  }
  
  const availableSkills = classSkills[character.value.class] || []
  const numSkills = character.value.class === 'Rogue' ? 4 : 2
  
  // Randomly select skills
  const shuffled = [...availableSkills].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numSkills)
}

// Generate random character
const generateRandomCharacter = () => {
  character.value.name = generateRandomName()
  character.value.race = races[Math.floor(Math.random() * races.length)].name
  character.value.class = classes[Math.floor(Math.random() * classes.length)].name
  character.value.background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
  generateAbilityScores()
  calculateStats()
  currentStep.value = totalSteps
}

const generateRandomName = () => {
  const names = [
    'Aelar', 'Aramil', 'Aranea', 'Berris', 'Citrus', 'Dayereth', 'Enna', 'Galinndan',
    'Hadarai', 'Immeral', 'Ivellios', 'Korfel', 'Lamlis', 'Laucian', 'Mindartis',
    'Naal', 'Nutae', 'Paelynn', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Silvyr',
    'Suhnab', 'Thamior', 'Theren', 'Theriatis', 'Thervan', 'Uthemar', 'Vanuath', 'Varis'
  ]
  return names[Math.floor(Math.random() * names.length)]
}

// Navigation functions
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
    if (currentStep.value === 6) {
      calculateStats()
    }
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const resetCharacter = () => {
  character.value = {
    name: '',
    race: '',
    class: '',
    background: '',
    level: 1,
    abilityScores: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    hitPoints: 0,
    armorClass: 10,
    proficiencyBonus: 2,
    skills: [],
    equipment: []
  }
  currentStep.value = 1
}

// Computed properties
const selectedRace = computed(() => races.find(r => r.name === character.value.race))
const selectedClass = computed(() => classes.find(c => c.name === character.value.class))
const isComplete = computed(() => character.value.name && character.value.race && character.value.class && character.value.background)

onMounted(() => {
  generateAbilityScores()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          D&D 5e Character Generator
        </h1>
        <p class="text-gray-300">Create your next adventurer with our step-by-step character generator</p>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-300">Step {{ currentStep }} of {{ totalSteps }}</span>
          <span class="text-sm font-medium text-gray-300">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Character Creation Steps -->
        <div class="lg:col-span-2">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            
            <!-- Step 1: Character Name -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h2 class="text-2xl font-semibold mb-4">Character Name</h2>
              <div>
                <label class="block text-sm font-medium mb-2">Character Name</label>
                <input 
                  v-model="character.name"
                  type="text" 
                  placeholder="Enter character name"
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
              </div>
              <button 
                @click="character.name = generateRandomName()"
                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Generate Random Name
              </button>
            </div>

            <!-- Step 2: Race Selection -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-2xl font-semibold mb-4">Choose Race</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="race in races" 
                  :key="race.name"
                  @click="character.race = race.name"
                  class="p-4 bg-gray-700 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-600"
                  :class="{ 'border-purple-500 bg-purple-900/30': character.race === race.name, 'border-gray-600': character.race !== race.name }"
                >
                  <h3 class="font-semibold mb-2">{{ race.name }}</h3>
                  <ul class="text-sm text-gray-300 space-y-1">
                    <li v-for="trait in race.traits" :key="trait">• {{ trait }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Step 3: Class Selection -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-2xl font-semibold mb-4">Choose Class</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="classOption in classes" 
                  :key="classOption.name"
                  @click="character.class = classOption.name"
                  class="p-4 bg-gray-700 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-600"
                  :class="{ 'border-purple-500 bg-purple-900/30': character.class === classOption.name, 'border-gray-600': character.class !== classOption.name }"
                >
                  <h3 class="font-semibold mb-2">{{ classOption.name }}</h3>
                  <p class="text-sm text-gray-300 mb-1">Hit Die: d{{ classOption.hitDie }}</p>
                  <p class="text-sm text-gray-300">Primary: {{ classOption.primaryAbility }}</p>
                </div>
              </div>
            </div>

            <!-- Step 4: Background -->
            <div v-if="currentStep === 4" class="space-y-6">
              <h2 class="text-2xl font-semibold mb-4">Choose Background</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  v-for="bg in backgrounds"
                  :key="bg"
                  @click="character.background = bg"
                  class="p-3 bg-gray-700 rounded-lg border-2 transition-all hover:bg-gray-600"
                  :class="{ 'border-purple-500 bg-purple-900/30': character.background === bg, 'border-gray-600': character.background !== bg }"
                >
                  {{ bg }}
                </button>
              </div>
            </div>

            <!-- Step 5: Ability Scores -->
            <div v-if="currentStep === 5" class="space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold">Ability Scores</h2>
                <button 
                  @click="generateAbilityScores"
                  class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Reroll All
                </button>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  v-for="(score, ability) in character.abilityScores" 
                  :key="ability"
                  class="bg-gray-700 rounded-lg p-4 text-center"
                >
                  <h3 class="font-medium capitalize mb-2">{{ ability }}</h3>
                  <div class="text-2xl font-bold mb-1">{{ score }}</div>
                  <div class="text-sm text-gray-400">
                    Modifier: {{ getModifier(score) >= 0 ? '+' : '' }}{{ getModifier(score) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 6: Final Review -->
            <div v-if="currentStep === 6" class="space-y-6">
              <h2 class="text-2xl font-semibold mb-4">Character Complete!</h2>
              
              <!-- Use the CharacterSheet component for detailed display -->
              <CharacterSheet :character="character" />
              
              <div class="flex gap-4 mt-6">
                <button 
                  @click="resetCharacter"
                  class="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Create New Character
                </button>
                <button 
                  @click="generateRandomCharacter"
                  class="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Generate Random Character
                </button>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-8" v-if="currentStep < 6">
              <button 
                @click="prevStep"
                :disabled="currentStep === 1"
                class="px-6 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Previous
              </button>
              <button 
                @click="nextStep"
                class="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <!-- Character Preview -->
        <div class="lg:col-span-1">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 sticky top-4">
            <h3 class="text-xl font-semibold mb-4">Character Preview</h3>
            
            <div class="space-y-4">
              <div>
                <span class="text-gray-400">Name:</span>
                <span class="ml-2 font-medium">{{ character.name || 'Unnamed' }}</span>
              </div>
              
              <div>
                <span class="text-gray-400">Race:</span>
                <span class="ml-2 font-medium">{{ character.race || 'Not selected' }}</span>
              </div>
              
              <div>
                <span class="text-gray-400">Class:</span>
                <span class="ml-2 font-medium">{{ character.class || 'Not selected' }}</span>
              </div>
              
              <div>
                <span class="text-gray-400">Background:</span>
                <span class="ml-2 font-medium">{{ character.background || 'Not selected' }}</span>
              </div>

              <div v-if="character.race || character.class" class="pt-4 border-t border-gray-600">
                <h4 class="font-medium mb-2">Ability Scores</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div v-for="(score, ability) in character.abilityScores" :key="ability">
                    <span class="text-gray-400 capitalize">{{ ability.slice(0, 3) }}:</span>
                    <span class="ml-1">{{ score }} ({{ getModifier(score) >= 0 ? '+' : '' }}{{ getModifier(score) }})</span>
                  </div>
                </div>
              </div>

              <div v-if="selectedRace" class="pt-4 border-t border-gray-600">
                <h4 class="font-medium mb-2">Racial Traits</h4>
                <ul class="text-sm text-gray-300 space-y-1">
                  <li v-for="trait in selectedRace.traits" :key="trait">• {{ trait }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>