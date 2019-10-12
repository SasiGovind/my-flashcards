<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-container fluid class="py-1">
      <v-layout row wrap class="text-center">
        <v-flex lg3 class="blue height-sm"></v-flex>
        <v-flex lg6 class="red"></v-flex>
        <v-flex lg3 class="green"></v-flex>
      </v-layout>

      <v-layout row wrap class="text-center">
        <v-flex lg3 class="b-right">
          <div class="b-bottom">
            <span class="under-line text-uppercase font-weight-regular title">My Desks</span>
          </div>
          <v-container class="mb-0 pb-0">
            <v-layout v-if="dockInput.mode === 'add'">
              <v-flex lg9>
                <v-text-field
                  v-model="dockInput.placeholder"
                  :rules="[rules.required, rules.min]"
                  @keyup.enter="add('dock')"
                  label="Ajoute ton dock !"
                  outlined
                  dense
                  clearable
                  loading="false"
                ></v-text-field>
              </v-flex>
              <v-flex lg3>
                <v-btn class="ml-2" @click="add('dock')" color="primary">Ajouter</v-btn>
              </v-flex>
            </v-layout>
            <v-layout v-else-if="dockInput.mode === 'update'">
              <v-flex lg9>
                <v-text-field
                  v-model="dockInput.placeholder"
                  :rules="[rules.required, rules.min]"
                  @keyup.enter="update('dock')"
                  label="Modifie ton deck !"
                  outlined
                  dense
                  clearable
                  loading="false"
                  append-outer-icon="mdi-arrow-left-right-bold"
                  @click:append-outer="dockInput.mode = 'add'"
                ></v-text-field>
              </v-flex>
              <v-flex lg3>
                <v-btn class="ml-1" @click="update('dock')" color="yellow">Modifier</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <div v-if="docks.length === 0" class="my-auto">Espace vide ! ajoutez des docks</div>
          <div v-else>
            <!-- Début docks -->
            <v-card v-for="dock in docks" :key="dock.title" class="mx-auto" tile>
              <v-list-group prepend-icon="mdi-plus-circle" value="false" v-model="dock.active">
                <template v-slot:activator>
                  <v-list-item-title class="font-weight-light headline">{{ dock.title }}</v-list-item-title>
                  <!-- <v-list-item-action style="position:absolute; left:1%" class="my-auto">
                  <v-btn icon>
                    <v-icon color="primary lighten-1">mdi-close</v-icon>
                  </v-btn>
                  </v-list-item-action>-->
                  <v-hover v-slot:default="{ hover }" close-delay="200">
                    <v-list-item-action style="position:absolute; right:22%" class="my-auto">
                      <v-btn @click="updateInput('dock', dock.title)" icon>
                        <v-icon :color="hover ? 'orange lighten-1' : 'grey lighten-1'">mdi-update</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-hover>
                  <v-hover v-slot:default="{ hover }" close-delay="200">
                    <v-list-item-action style="position:absolute; right:12%" class="my-auto">
                      <v-btn @click="d_delete('dock', dock.title)" icon>
                        <v-icon
                          :color="hover ? 'red lighten-1' : 'grey lighten-1'"
                        >mdi-delete-forever</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-hover>
                </template>
                <v-text-field
                  v-if="dock.input.mode === 'add'"
                  v-model="dock.input.placeholder"
                  :rules="[rules.min]"
                  @keyup.enter="add('deck',dock.title)"
                  label="Ajoute ton deck !"
                  outlined
                  dense
                  clearable
                  loading="false"
                  append-outer-icon="mdi-plus-circle"
                  @click:append-outer="add('deck',dock.title)"
                ></v-text-field>
                <v-text-field
                  v-else-if="dock.input.mode === 'update'"
                  v-model="dock.input.placeholder"
                  :rules="[rules.min]"
                  @keyup.enter="update('deck',dock.title)"
                  label="Modifie ton deck !"
                  outlined
                  dense
                  clearable
                  loading="false"
                  append-outer-icon="mdi-update"
                  @click:append-outer="update('deck',dock.title)"
                ></v-text-field>
                <!-- Début decks -->
                <v-list v-if="dock.decks.length > 0" shaped class="mt-0 pt-0">
                  <v-list-item-group color="primary">
                    <v-list-item v-for="(deck) in dock.decks" :key="deck.title">
                      <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>-->
                      <v-list-item-content style="position:absolute; float:left">
                        <v-list-item-title v-text="deck.title"></v-list-item-title>
                      </v-list-item-content>
                      <!-- <v-flex flex-grow-1></v-flex> -->
                      <v-list-item-content style="position:absolute; right:30%">
                        <v-list-item-title v-text="deck.count + ' cards'"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action style="position:absolute; right:20%" class="my-auto">
                        <v-btn icon>
                          <v-icon color="grey lighten-1">mdi-information-outline</v-icon>
                        </v-btn>
                      </v-list-item-action>
                      <v-hover v-slot:default="{ hover }" close-delay="200">
                        <v-list-item-action style="position:absolute; right:10%" class="my-auto">
                          <v-btn @click="updateInput('deck', dock.title, deck.title)" icon>
                            <v-icon
                              :color="hover ? 'orange lighten-1' : 'grey lighten-1'"
                            >mdi-update</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-hover>
                      <v-hover v-slot:default="{ hover }" close-delay="200">
                        <v-list-item-action style="position:absolute; right:0%" class="my-auto">
                          <v-btn @click="d_delete('deck', dock.title, deck.title)" icon>
                            <v-icon
                              :color="hover ? 'red lighten-1' : 'grey lighten-1'"
                            >mdi-delete-forever</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-hover>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-list-group>
            </v-card>
          </div>
          <!-- <v-container>
            <v-layout row v-for="deck in decks" :key="deck.title">
              <v-flex lg9>{{ deck.title }}</v-flex>
              <v-flex lg3>{{ deck.count }} cards</v-flex>
            </v-layout>
          </v-container>-->
        </v-flex>
        <v-flex lg6 class="b-right b-left">
          <div class="b-bottom">
            <span class="under-line text-uppercase font-weight-regular title">My FlashCards</span>
          </div>
        </v-flex>
        <v-flex lg3 class="b-left">
          <div class="b-bottom">
            <span class="under-line text-uppercase font-weight-regular title">Temple</span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
.txt:hover {
  color: red;
}

.b-right {
  border-right: 1px solid grey;
}

.b-top {
  border-top: 1px solid grey;
}

.b-bottom {
  border-bottom: 1px solid grey;
}

.b-left {
  border-left: 1px solid grey;
}

.height-sm {
  height: 5px;
}

.under-line {
  text-decoration: underline;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data: () => ({
    dockInput: {
      mode: 'add',
      oldTitle: '',
      placeholder: ''
    },
    docks: [
      { title: 'User',
        active: false,
        input: {
          mode: 'add',
          oldTitle: '',
          placeholder: ''
        },
        decks: [
          { title: 'Capitals', count: 5 },
          { title: 'History', count: 3 },
          { title: 'Bash', count: 129 }
        ],
        count: 3 }
    ],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 2 || 'Min 2 characters'
    }
  }),
  methods: {
    dfind (place, kdock, kdeck = -1) {
      if (place === 'dock') {
        return this.docks.find(dock => dock.title === kdock)
      } else { // deck
        return this.dfind('dock', kdock).decks.find(deck => deck.title === kdeck)
      }
    },
    add (place, kdock = -1) {
      var pack = (place === 'dock') ? this.docks : this.dfind('dock', kdock).decks
      var input = (place === 'dock') ? this.dockInput : this.dfind('dock', kdock).input
      if (input.placeholder === '') return
      if (pack.forEach(element => {
        if (element.title === input.placeholder) return true
      })) return
      if (place === 'dock') {
        pack.push({
          title: input.placeholder,
          input: {
            mode: 'add',
            title: '',
            placeholder: ''
          },
          decks: [],
          count: 0 })
      } else pack.push({ title: input.placeholder, count: 0 })
      input.placeholder = ''
    },
    update (place, kdock = -1) {
      var pack = (place === 'dock') ? this.docks : this.dfind('dock', kdock).decks
      var input = (place === 'dock') ? this.dockInput : this.dfind('dock', kdock).input
      pack.find(
        item => item.title === input.oldTitle
      ).title = input.placeholder
      var newInput = { mode: 'add', oldTitle: '', placeholder: '' }
      if (place === 'dock') this.dockInput = newInput
      else this.dfind('dock', kdock).input = newInput
    },
    updateInput (place, kdock, kdeck = -1) {
      var packObj = (place === 'dock') ? this.dfind('dock', kdock) : this.dfind('deck', kdock, kdeck)
      if (packObj !== undefined) {
        var titleToUpdate = packObj.title
        var input = { mode: 'update', oldTitle: titleToUpdate, placeholder: titleToUpdate }
        if (place === 'dock') this.dockInput = input
        else this.dfind('dock', kdock).input = input // deck
      }
    },
    d_delete (place, kdock, kdeck = -1) {
      var placeToSearch = (place === 'dock') ? this.docks : this.dfind('dock', kdock).decks
      var itemToDelete = (place === 'dock') ? this.dfind('dock', kdock) : this.dfind('deck', kdock, kdeck)
      if (placeToSearch === undefined || itemToDelete === undefined) return
      placeToSearch.splice(placeToSearch.indexOf(itemToDelete), 1)
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
