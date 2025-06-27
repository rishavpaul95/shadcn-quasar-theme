<template>
  <q-page class="q-pa-lg bg-background">
    <div class="text-h4 q-mb-md text-foreground">Component Showcase</div>
    <div class="text-subtitle1 text-muted q-mb-lg">
      Demonstrating Quasar components with shadcn/ui theme styling
    </div>

    <!-- Notification Demo -->
    <q-card class="q-mb-lg" id="notifications">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Notifications</div>
        <div class="row q-gutter-md">
          <q-btn color="positive" label="Success" @click="showNotification('positive')" />
          <q-btn color="negative" label="Error" @click="showNotification('negative')" />
          <q-btn color="warning" label="Warning" @click="showNotification('warning')" />
          <q-btn color="info" label="Info" @click="showNotification('info')" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Form Components -->
    <q-card class="q-mb-lg" id="forms">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Form Components</div>
        <q-form class="q-gutter-md">
          <div class="row q-gutter-md">
            <div class="col">
              <label class="text-sm font-medium text-foreground">Text Input</label>
              <q-input v-model="textInput" outlined dense placeholder="Enter text here" />
            </div>
            <div class="col">
              <label class="text-sm font-medium text-foreground">Email Input</label>
              <q-input v-model="emailInput" type="email" outlined dense placeholder="Enter email" />
            </div>
          </div>

          <div class="row q-gutter-md">
            <div class="col">
              <label class="text-sm font-medium text-foreground">Password</label>
              <q-input
                v-model="passwordInput"
                type="password"
                outlined
                dense
                placeholder="Enter password"
              />
            </div>
            <div class="col">
              <label class="text-sm font-medium text-foreground">Select</label>
              <q-select
                v-model="selectedOption"
                :options="selectOptions"
                outlined
                dense
                placeholder="Choose option"
              />
            </div>
          </div>

          <div class="row q-gutter-md">
            <div class="col">
              <label class="text-sm font-medium text-foreground">Textarea</label>
              <q-input
                v-model="textareaInput"
                type="textarea"
                outlined
                rows="3"
                placeholder="Enter longer text here"
              />
            </div>
            <div class="col">
              <label class="text-sm font-medium text-foreground">Date Picker</label>
              <q-input v-model="dateInput" outlined dense placeholder="Select date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="dateInput" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-gutter-md items-center">
            <q-checkbox v-model="checkboxValue" label="Checkbox option" />
            <q-radio v-model="radioValue" val="option1" label="Radio option 1" />
            <q-radio v-model="radioValue" val="option2" label="Radio option 2" />
            <q-toggle v-model="toggleValue" label="Toggle switch" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Buttons -->
    <q-card class="q-mb-lg" id="buttons">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Buttons</div>
        <div class="row q-gutter-md q-mb-md">
          <q-btn color="primary" label="Primary" />
          <q-btn color="secondary" label="Secondary" />
          <q-btn color="positive" label="Success" />
          <q-btn color="negative" label="Danger" />
          <q-btn color="warning" label="Warning" />
          <q-btn color="info" label="Info" />
        </div>
        <div class="row q-gutter-md q-mb-md">
          <q-btn outline color="primary" label="Outline Primary" />
          <q-btn flat color="primary" label="Flat Primary" />
          <q-btn unelevated color="primary" label="Unelevated" />
          <q-btn round color="primary" icon="add" />
          <q-btn fab color="primary" icon="add" />
        </div>
        <div class="row q-gutter-md">
          <q-btn color="primary" label="Loading" loading />
          <q-btn color="primary" label="Disabled" disable />
          <q-btn color="primary" label="With Icon" icon="star" />
          <q-btn color="primary" label="Icon Right" icon-right="arrow_forward" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Table -->
    <q-card class="q-mb-lg" id="table">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Data Table</div>
        <q-table
          :rows="tableRows"
          :columns="tableColumns"
          row-key="id"
          :pagination="tablePagination"
          selection="multiple"
          v-model:selected="selectedRows"
        >
          <template v-slot:top>
            <div class="text-h6 text-foreground">Users Table</div>
            <q-space />
            <q-input v-model="tableFilter" outlined dense debounce="300" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat round color="primary" icon="edit" size="sm" />
              <q-btn flat round color="negative" icon="delete" size="sm" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Lists and Trees -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Lists & Trees</div>
        <div class="row q-gutter-lg">
          <div class="col">
            <div class="text-subtitle2 text-foreground q-mb-sm">List with Items</div>
            <q-list bordered>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="inbox" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Inbox</q-item-label>
                  <q-item-label caption>5 new messages</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="positive" name="send" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Sent</q-item-label>
                  <q-item-label caption>Last sent 2 hours ago</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="warning" name="drafts" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Drafts</q-item-label>
                  <q-item-label caption>3 draft messages</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col">
            <div class="text-subtitle2 text-foreground q-mb-sm">Tree Structure</div>
            <q-tree :nodes="treeNodes" node-key="label" default-expand-all />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Dialogs and Modals -->
    <q-card class="q-mb-lg" id="dialogs">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Dialogs & Modals</div>
        <div class="row q-gutter-md">
          <q-btn color="primary" label="Show Dialog" @click="showDialog = true" />
          <q-btn color="secondary" label="Confirm Dialog" @click="showConfirmDialog" />
          <q-btn color="info" label="Prompt Dialog" @click="showPromptDialog" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Progress and Loading -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Progress & Loading</div>
        <div class="q-gutter-md">
          <div>
            <div class="text-subtitle2 text-foreground q-mb-sm">Linear Progress</div>
            <q-linear-progress :value="progressValue" color="primary" />
          </div>
          <div>
            <div class="text-subtitle2 text-foreground q-mb-sm">Circular Progress</div>
            <q-circular-progress :value="progressValue" size="50px" color="primary" />
          </div>
          <div>
            <div class="text-subtitle2 text-foreground q-mb-sm">Spinners</div>
            <q-spinner color="primary" size="2em" />
            <q-spinner-dots color="secondary" size="2em" />
            <q-spinner-grid color="positive" size="2em" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Tabs and Panels -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Tabs & Panels</div>
        <q-tabs v-model="activeTab" class="text-primary">
          <q-tab name="tab1" label="Tab 1" />
          <q-tab name="tab2" label="Tab 2" />
          <q-tab name="tab3" label="Tab 3" />
        </q-tabs>

        <q-tab-panels v-model="activeTab" class="q-mt-md">
          <q-tab-panel name="tab1">
            <div class="text-h6 text-foreground">Tab 1 Content</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="tab2">
            <div class="text-h6 text-foreground">Tab 2 Content</div>
            Ut enim ad minim veniam, quis nostrud exercitation.
          </q-tab-panel>
          <q-tab-panel name="tab3">
            <div class="text-h6 text-foreground">Tab 3 Content</div>
            Duis aute irure dolor in reprehenderit in voluptate.
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <!-- Expansion Panels -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Expansion Panels</div>
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          label="Account settings"
          caption="Update your personal information"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="security"
          label="Security"
          caption="Manage your security preferences"
        >
          <q-card>
            <q-card-section> Ut enim ad minim veniam, quis nostrud exercitation. </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>
    </q-card>

    <!-- Badge and Chips -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-foreground q-mb-md">Badges & Chips</div>
        <div class="q-gutter-md">
          <div>
            <div class="text-subtitle2 text-foreground q-mb-sm">Badges</div>
            <q-icon name="email" size="2em">
              <q-badge floating color="negative">5</q-badge>
            </q-icon>
            <q-icon name="notifications" size="2em" class="q-ml-md">
              <q-badge floating color="positive">New</q-badge>
            </q-icon>
          </div>
          <div>
            <div class="text-subtitle2 text-foreground q-mb-sm">Chips</div>
            <q-chip color="primary" text-color="white" icon="star">Primary</q-chip>
            <q-chip color="secondary" text-color="white" icon="favorite">Secondary</q-chip>
            <q-chip removable color="positive" text-color="white">Removable</q-chip>
            <q-chip outline color="primary" icon="info">Outline</q-chip>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Floating Action Button for Quick Navigation -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="navigation" direction="up" color="primary" :model-value="false">
        <q-fab-action
          @click="scrollToSection('notifications')"
          color="purple"
          icon="notifications"
          label="Notifications"
        />
        <q-fab-action @click="scrollToSection('forms')" color="primary" icon="edit" label="Forms" />
        <q-fab-action
          @click="scrollToSection('buttons')"
          color="secondary"
          icon="smart_button"
          label="Buttons"
        />
        <q-fab-action
          @click="scrollToSection('table')"
          color="positive"
          icon="table_chart"
          label="Table"
        />
        <q-fab-action
          @click="scrollToSection('dialogs')"
          color="orange"
          icon="message"
          label="Dialogs"
        />
      </q-fab>
    </q-page-sticky>

    <!-- Dialog Component -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-foreground">Dialog Title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          This is a sample dialog demonstrating the shadcn theme styling.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn unelevated label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Form inputs
const textInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const textareaInput = ref('')
const dateInput = ref('')
const checkboxValue = ref(false)
const radioValue = ref('option1')
const toggleValue = ref(false)
const selectedOption = ref(null)

const selectOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

// Table data
const selectedRows = ref([])
const tableFilter = ref('')
const tablePagination = ref({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 5,
})

const tableColumns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  {
    name: 'role',
    label: 'Role',
    align: 'left',
    field: 'role',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'center',
    field: 'actions',
  },
]

const tableRows = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'Active',
  },
])

// Tree data
const treeNodes = ref([
  {
    label: 'Documents',
    children: [
      {
        label: 'Work',
        children: [{ label: 'Project A.pdf' }, { label: 'Report.docx' }],
      },
      { label: 'Personal' },
    ],
  },
  {
    label: 'Pictures',
    children: [{ label: 'Vacation' }, { label: 'Family' }],
  },
])

// Dialog state
const showDialog = ref(false)

// Tabs
const activeTab = ref('tab1')

// Progress
const progressValue = ref(0.6)

// Methods
const showNotification = (type) => {
  const messages = {
    positive: 'Success! Operation completed successfully.',
    negative: 'Error! Something went wrong.',
    warning: 'Warning! Please check your input.',
    info: "Info: Here's some helpful information.",
  }

  $q.notify({
    type,
    message: messages[type],
    position: 'top',
    timeout: 3000,
  })
}

const showConfirmDialog = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to proceed?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    $q.notify({
      type: 'positive',
      message: 'Confirmed!',
      position: 'top',
    })
  })
}

const showPromptDialog = () => {
  $q.dialog({
    title: 'Prompt',
    message: 'What is your name?',
    prompt: {
      model: '',
      type: 'text',
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    $q.notify({
      type: 'info',
      message: `Hello ${data}!`,
      position: 'top',
    })
  })
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Update progress periodically for demo
onMounted(() => {
  setInterval(() => {
    progressValue.value = Math.random()
  }, 2000)
})
</script>

<style scoped>
.q-card {
  margin-bottom: 1rem;
}

.text-subtitle2 {
  font-weight: 500;
}
</style>
