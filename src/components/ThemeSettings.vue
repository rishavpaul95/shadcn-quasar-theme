<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Theme Settings</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- Theme Mode Selection -->
        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Theme Mode</div>
          <q-option-group
            v-model="selectedTheme"
            :options="themeOptions"
            color="primary"
            inline
            @update:model-value="updateTheme"
          />
        </div>

        <q-separator class="q-my-md" />

        <!-- Color Customization -->
        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Primary Color</div>
          <div class="row q-gutter-sm">
            <q-btn
              v-for="color in primaryColors"
              :key="color.value"
              :style="{ backgroundColor: color.value }"
              size="sm"
              round
              @click="updatePrimaryColor(color.value)"
              :outline="themeStore.primaryColor !== color.value"
              class="color-btn"
            >
              <q-icon
                v-if="themeStore.primaryColor === color.value"
                name="check"
                color="white"
                size="xs"
              />
            </q-btn>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Preview</div>
          <q-card
            class="preview-card q-pa-md"
            :class="{ 'preview-card--dark': themeStore.isDarkMode }"
          >
            <div class="text-body1 q-mb-sm">Sample Card</div>
            <q-btn color="primary" label="Primary Button" size="sm" class="q-mr-sm" />
            <q-btn color="secondary" label="Secondary" size="sm" flat />
          </q-card>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Reset" color="grey" @click="resetTheme" />
        <q-btn flat label="Close" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useThemeStore } from 'src/stores/theme'

export default {
  name: 'ThemeSettings',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const themeStore = useThemeStore()

    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })

    const selectedTheme = ref(themeStore.isDarkMode ? 'dark' : 'light')

    const themeOptions = [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
      { label: 'System', value: 'system' },
    ]

    const primaryColors = [
      { name: 'Blue', value: '#1976D2' },
      { name: 'Teal', value: '#009688' },
      { name: 'Purple', value: '#9C27B0' },
      { name: 'Deep Purple', value: '#673AB7' },
      { name: 'Indigo', value: '#3F51B5' },
      { name: 'Green', value: '#4CAF50' },
      { name: 'Orange', value: '#FF9800' },
      { name: 'Red', value: '#F44336' },
    ]

    const updateTheme = (value) => {
      if (value === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        themeStore.setTheme(isDark)
      } else {
        themeStore.setTheme(value === 'dark')
      }
    }

    const updatePrimaryColor = (color) => {
      themeStore.updateColors({ primary: color })
    }

    const resetTheme = () => {
      themeStore.resetTheme()
      selectedTheme.value = 'light'
    }

    const closeDialog = () => {
      isOpen.value = false
    }

    // Watch for theme changes from outside this component
    watch(
      () => themeStore.isDarkMode,
      (isDark) => {
        selectedTheme.value = isDark ? 'dark' : 'light'
      },
    )

    return {
      isOpen,
      themeStore,
      selectedTheme,
      themeOptions,
      primaryColors,
      updateTheme,
      updatePrimaryColor,
      resetTheme,
      closeDialog,
    }
  },
}
</script>

<style scoped>
.color-btn {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
}

.color-btn:hover {
  border-color: currentColor;
  opacity: 0.8;
}

.preview-card {
  background: rgba(255, 255, 255, 0.95);
  transition: background-color 0.3s ease;
}

.preview-card--dark {
  background: rgba(30, 30, 30, 0.95);
  color: white;
}
</style>
