<template>
  <q-item
    clickable
    :tag="props.route ? 'div' : 'a'"
    :target="props.route ? undefined : '_blank'"
    :href="props.route ? undefined : props.link"
    @click="props.route ? $router.push(props.route) : undefined"
  >
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '#',
  },

  route: {
    type: Object,
    default: null,
  },

  icon: {
    type: String,
    default: '',
  },
})
</script>
