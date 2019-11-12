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
                  :label=textes[no_langue][0]
                  outlined
                  dense
                  clearable
                  loading="false"
                ></v-text-field>
              </v-flex>
              <v-flex lg3>
                <v-btn class="ml-2" @click="add('dock')" color="primary">{{textes[no_langue][1]}}</v-btn>
              </v-flex>
            </v-layout>
            <v-layout v-else-if="dockInput.mode === 'update'">
              <v-flex lg9>
                <v-text-field
                  v-model="dockInput.placeholder"
                  :rules="[rules.required, rules.min]"
                  @keyup.enter="update('dock')"
                  :label=textes[no_langue][2]
                  outlined
                  dense
                  clearable
                  loading="false"
                  append-outer-icon="mdi-arrow-left-right-bold"
                  @click:append-outer="dockInput.mode = 'add'"
                ></v-text-field>
              </v-flex>
              <v-flex lg3>
                <v-btn class="ml-1" @click="update('dock')" color="yellow">{{textes[no_langue][3]}}</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <div v-if="docks.length === 0" class="my-auto">{{textes[no_langue][4]}}</div>
          <div v-else>
            <!-- Début docks -->
            <v-card class="mx-auto" tile>
              <v-list>
                <v-list-group
                  prepend-icon="mdi-chevron-right-circle"
                  ripple
                  v-for="dock in docks"
                  :key="dock.title"
                  v-model="dock.active"
                  @click="selectItem('dock', dock.title)"
                >
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
                    :label=textes[no_langue][5]
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
                    :label=textes[no_langue][2]
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
                      <v-list-item
                        v-for="(deck) in dock.decks"
                        :key="deck.title"
                        @click="selectItem('deck', deck.title)"
                      >
                        <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>-->
                        <v-list-item-content style="position:absolute; float:left">
                          <v-list-item-title v-text="deck.title"></v-list-item-title>
                        </v-list-item-content>
                        <!-- <v-flex flex-grow-1></v-flex> -->
                        <v-list-item-content style="position:absolute; right:30%">
                          <v-list-item-title v-text="deck.flashcards.length + ' cards'"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action style="position:absolute; right:20%" class="my-auto">
                          <!-- <v-btn icon>
                            <v-icon color="grey lighten-1">mdi-information-outline</v-icon>
                          </v-btn>-->
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on="on">
                                <v-icon color="grey lighten-1">mdi-information-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>Examen Success : {{ deck!=undefined?Math.round((deck.success/deck.flashcards.length)*100):'0' }} %</span>
                          </v-tooltip>
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
              </v-list>
            </v-card>
          </div>
          <!-- <v-container>
            <v-layout row v-for="deck in decks" :key="deck.title">
              <v-flex lg9>{{ deck.title }}</v-flex>
              <v-flex lg3>{{ deck.flashcards.length }} cards</v-flex>
            </v-layout>
          </v-container>-->
        </v-flex>
        <v-flex lg6 class="b-right b-left">
          <div class="b-bottom">
            <span class="under-line text-uppercase font-weight-regular title">My FlashCards</span>
          </div>
          <div v-if="selectedItem.dock !== '' && selectedItem.deck !== ''">
            <!-- dialog for flashcards -->
            <v-dialog v-model="card_dialog.show" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  @click="show_dialog(textes[no_langue][1] + ' Card', card_dialog)"
                  v-on="on"
                  class="ma-2"
                  rounded
                  outlined
                  color="red"
                >
                 {{textes[no_langue][1]}} Flashcard {{ (selectedItem.deck != '')?textes[no_langue][17]+selectedItem.deck:'' }}
                  <v-icon right>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline mx-auto">{{ card_dialog.title }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="card_dialog.key"
                          :label=textes[no_langue][6]
                          placeholder="France"
                          :readonly="card_dialog.title==='Card'?true:false"
                          required
                          filled
                          :clearable="card_dialog.title==='Card'?false:true"
                          rounded
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="card_dialog.value"
                          :label=textes[no_langue][7]
                          placeholder="Paris"
                          :readonly="card_dialog.title==='Card'?true:false"
                          auto-grow
                          :clearable="card_dialog.title==='Card'?false:true"
                          counter
                          filled
                          rounded
                          rowHeight="10"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small v-if="card_dialog.title!=='Card'">{{textes[no_langue][8]}}</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close_card(card_dialog, true, true)"
                  >{{textes[no_langue][9]}}</v-btn>
                  <v-btn
                    v-if="card_dialog.title !== 'Card'"
                    color="blue darken-1"
                    text
                    @click="card_dialog.title===textes[no_langue][1] + ' Card'?saveFlashcard(selectedItem, card_dialog):dcard_update_save(selectedItem, card_dialog)"
                  >{{ card_dialog.title===textes[no_langue][1] + ' Card'?textes[no_langue][21]:textes[no_langue][3] }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <template>
              <v-card v-if="currentFlashcardsCount > 0" class="mx-auto" tile>
                <v-list rounded two-line shaped class="my-0 py-0">
                  <v-list-item
                    v-for="(card,i) in dfind('deck', this.selectedItem.dock, this.selectedItem.deck).flashcards"
                    :key="i"
                    @click="show_card(card.key, card.value)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ card.key }}</v-list-item-title>
                      <v-list-item-subtitle v-html="card.value"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-hover v-slot:default="{ hover }" close-delay="200">
                      <v-list-item-action style="position:absolute; right:10%" class="my-auto">
                        <v-btn @click="dcard_update_start(card.key, card.value)" icon>
                          <v-icon :color="hover ? 'orange lighten-1' : 'grey lighten-1'">mdi-update</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-hover>
                    <v-hover v-slot:default="{ hover }" close-delay="200">
                      <v-list-item-action style="position:absolute; right:0%" class="my-auto">
                        <v-btn @click="dcard_delete(card.key, card.value)" icon>
                          <v-icon
                            :color="hover ? 'red lighten-1' : 'grey lighten-1'"
                          >mdi-delete-forever</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-hover>
                  </v-list-item>
                </v-list>
              </v-card>
              <div v-else class="my-auto">{{textes[no_langue][10]}}</div>
            </template>
          </div>
          <div v-else>{{textes[no_langue][11]}}</div>
        </v-flex>
        <v-flex lg3 class="b-left">
          <div class="b-bottom">
            <span class="under-line text-uppercase font-weight-regular title">Temple</span>
          </div>
          <v-dialog
            v-model="play_dialog.show"
            persistent
            max-width="600px"
            @keydown.esc="close_card(play_dialog, false, false, true)"
            @keydown.left="shift_card(play_dialog, 'prev')"
            @keydown.right="shift_card(play_dialog, 'next')"
          >
            <template v-slot:activator="{ on }">
              <v-btn
              v-if="selectedItem.deck != '' && selectedItem.dock != ''"
                @click="show_play_cards(play_dialog)"
                v-on="on"
                color="success"
                class="ma-2"
                rounded
                dark
              >{{textes[no_langue][12]}} {{ (selectedItem.deck != '')?selectedItem.deck:'' }} Cards</v-btn>
              <v-btn
              v-else
              depressed
              rounded
              >
                dock : '{{ selectedItem.dock }}' > deck : '{{ selectedItem.deck }}'
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline mx-auto">{{ play_dialog.title }}</span>
                <v-icon
                  style="position:absolute; right:3%;"
                  @click="close_card(play_dialog, false, false, true)"
                >mdi-close</v-icon>
              </v-card-title>
              <v-card-text>
                <div v-if="play_dialog.title === 'Examen'" class="play_card_success"><v-chip class="ma-0">Answers : {{ this.dfind("deck", this.selectedItem.dock, this.selectedItem.deck)!=undefined?this.dfind("deck", this.selectedItem.dock, this.selectedItem.deck).success:'' }} / {{ play_dialog.currentDeck!=undefined?play_dialog.currentDeck.length:'' }}</v-chip></div>
              </v-card-text>
              <v-card-text>
                <div class="play_card_box">
                  <div class="key">{{textes[no_langue][13]}}</div>
                  <div
                    v-if="play_dialog.title==='Revision' || (play_dialog.title==='Examen' && play_dialog.examen.key===false)"
                    class="key_value"
                  >
                    <p class="mb-2">{{ play_dialog.key }}</p>
                  </div>
                  <div v-else-if="play_dialog.title==='Examen' && play_dialog.examen.key===true">
                    <v-container style="border-radius: 20px;" class="grey lighten-5 py-1">
                      <v-row no-gutters>
                        <template v-for="(n, i) in currentExamenCardAnswers">
                          <v-col :key="i+1">
                            <v-btn
                              style="width:95%;"
                              :color="play_dialog.currentCard.answerSelected===i || play_dialog.currentCard.answerSelected>=0? (n.correct)?'green':'red' : ''"
                              @click="selectCardAnswer(i, false, n.correct)"
                              class="mx-1"
                              rounded
                            >
                              {{n.text}}
                              <v-icon
                                v-if="play_dialog.currentCard.answerSelected===i && n.correct"
                                right
                              >mdi-check-circle-outline</v-icon>
                              <v-icon
                                v-else-if="play_dialog.currentCard.answerSelected===i && !n.correct"
                                right
                              >mdi-close-circle-outline</v-icon>
                            </v-btn>
                          </v-col>
                          <v-responsive v-if="i+1 === 2" :key="`width-${i+1}`" width="100%"></v-responsive>
                        </template>
                      </v-row>
                    </v-container>
                  </div>
                </div>
                <!-- spacer -->
                <div style="height:30px"></div>
                <!-- spacer -->
                <div class="play_card_box">
                  <div class="key">{{textes[no_langue][26]}}</div>
                  <div
                    v-if="play_dialog.title==='Revision' || (play_dialog.title==='Examen' && play_dialog.examen.key===true)"
                    class="key_value"
                  >
                    <p class="mb-2">{{ play_dialog.value }}</p>
                  </div>
                  <div v-else-if="play_dialog.title==='Examen' && play_dialog.examen.key===false">
                    <v-container style="border-radius: 20px;" class="grey lighten-5 py-1">
                      <v-row no-gutters>
                        <template v-for="(n, i) in currentExamenCardAnswers">
                          <v-col :key="i+1">
                            <v-btn
                              style="width:95%;"
                              :color="play_dialog.currentCard.answerSelected===i || play_dialog.currentCard.answerSelected>=0? (n.correct)?'green':'red' : ''"
                              @click="selectCardAnswer(i, false, n.correct)"
                              class="mx-1"
                              rounded
                            >
                              {{n.text}}
                              <v-icon
                                v-if="play_dialog.currentCard.answerSelected===i && n.correct"
                                right
                              >mdi-check-circle-outline</v-icon>
                              <v-icon
                                v-else-if="play_dialog.currentCard.answerSelected===i && !n.correct"
                                right
                              >mdi-close-circle-outline</v-icon>
                            </v-btn>
                          </v-col>
                          <v-responsive v-if="i+1 === 2" :key="`width-${i+1}`" width="100%"></v-responsive>
                        </template>
                      </v-row>
                    </v-container>
                  </div>
                </div>
                <!-- <small>*indicates required field</small> -->
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="shift_card(play_dialog, 'prev')">{{textes[no_langue][15]}}</v-btn>
                <v-spacer></v-spacer>
                <p
                  v-if="play_dialog.currentDeck !== undefined"
                >{{ (play_dialog.currentCount+1)+'/'+play_dialog.currentDeck.length }}</p>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="shift_card(play_dialog, 'next')">{{textes[no_langue][16]}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div>
            <v-card>
              <v-tabs
                v-model="tab"
                background-color="deep-purple accent-4"
                centered
                dark
                height="40px"
                grow
                icons-and-text
              >
                <v-tabs-slider></v-tabs-slider>
                <v-tab @click="play_dialog.title='Revision'" href="#tab-1">{{textes[no_langue][22]}}</v-tab>
                <v-tab @click="play_dialog.title='Examen'" href="#tab-2">{{textes[no_langue][23]}}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item value="tab-1">
                  <v-card flat>
                    <v-card-text class="py-2">{{textes[no_langue][24]}}</v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="tab-2">
                  <v-card flat>
                    <div style="display:inline-block">
                      <div style="display:table-cell;vertical-align:middle;" class="mx-0 px-0 pt-2">
                        <v-btn
                          class="mx-2"
                          style="min-width:100px"
                          :color="play_dialog.examen.key ? 'purple white--text' : 'grey lighten-1'"
                          small
                          active-class="purple white--text"
                          depressed
                          rounded
                          dense
                          @click="play_dialog.examen.key=true"
                        >{{textes[no_langue][13]}}</v-btn>
                        <v-btn
                          :color="!play_dialog.examen.key ? 'purple white--text' : 'grey lighten-1'"
                          style="min-width:100px"
                          small
                          class="mx-2"
                          active-class="purple white--text"
                          depressed
                          rounded
                          @click="play_dialog.examen.key=false"
                        >{{textes[no_langue][26]}}</v-btn>
                      </div>
                    </div>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
              <!-- <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
                <v-card flat>
                  <v-card-text>{{ text }}</v-card-text>
                </v-card>
              </v-tab-item>
              </v-tabs-items>-->
            </v-card>
          </div>
          <div
            style="font-size:12px; margin-top:5px"
          >{{textes[no_langue][25]}}</div>
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

.play_card_success {
  border-radius: 20px;
  width: 22%;
  margin: auto;
  transition-property: background-color;
  transition-duration: 1s;
}

.play_card_box {
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  width: 95%;
  margin: auto;
  transition-property: background-color;
  transition-duration: 1s;
}

.play_card_box:hover {
  background-color: rgba(0, 0, 0, 0.16);
}

.play_card_box div {
  text-align: center;
  padding: 2px;
}

.play_card_box div.key_value {
  font-size: 20px;
  /* font-weight: 500 */
}

.colored {
  color: red;
  background-color: aqua;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  props: ['no_langue'],
  name: 'home',
  data: () => ({
    value: true,
    currentUser: null,
    server_url: '',
    selectedItem: {
      dock: '',
      deck: ''
    },
    tab: null,
    dockInput: {
      mode: 'add',
      oldTitle: '',
      placeholder: ''
    },
    lsKey: 'currentUser',
    docks: [],
    rules: {
      required: 0,
      min: 0
    },
    card_dialog: {
      show: false,
      title: 'Card',
      key: '',
      value: '',
      old_card: {
        key: '',
        value: ''
      }
    },
    play_dialog: {
      show: false,
      title: 'Revision',
      examen: {
        key: true
      },
      key: '',
      value: '',
      currentDeck: '',
      currentCount: 0,
      currentCard: {
        answerSelected: -1
      }
    },
    textes: [
      [
        'Ajoute ton dock !',
        'Ajouter',
        'Modifie ton deck !',
        'Modifier',
        'Espace vide ! ajoutez des docks',
        'Ajoute ton deck !',
        'Entre ta clé',
        'Entre ta valeur*',
        '*indique les champs requis',
        'Fermer',
        'Espace vide ! Ajoutez une carte',
        'Selectionnez un dock et un deck valide',
        'Jouer',
        'Clé',
        'Valider',
        'Prec',
        'Suivant',
        'pour ',
        'Veuillez vous connecter svp !',
        'Champ obligatoire.',
        'Min 2 caractères',
        'Sauver',
        'Révision',
        'Examen',
        'Révisez toutes vos cartes',
        'Plus de fonctionnalités à venir: compte à rebours par carte, ordre normal / continu / aléatoire, nombre de cartes à former, etc.',
        'Valeur'
      ],
      [
        'Add your dock !',
        'Add',
        'Modify your deck !',
        'Modify',
        'Empty space ! add docks',
        'Add your deck !',
        'Enter your key',
        'Enter your value*',
        '*indicates required field',
        'Close',
        'Empty space ! Add a card',
        'Select a dock and a valid deck',
        'Play',
        'Key',
        'Valid',
        'Prev',
        'Next',
        'to ',
        'Please log in!',
        'Required.',
        'Min 2 characters',
        'Save',
        'Revision',
        'Exam',
        'Revise all your cards',
        'More features to come : countdown per card, order normal/continous/random, choose number of cards to train, etc',
        'Value'
      ]
    ]
  }),
  methods: {
    getConnectedUser () {
      const user = sessionStorage.getItem(this.lsKey)
      return user ? JSON.parse(user) : null
    },
    // async getName() {}
    async getStocks () {
      this.currentUser = this.getConnectedUser() // Penser à controler si current user nul
      const response = await this.axios.post(
        this.server_url + '/stock/getStocks'
      )
      // this.docks = response.data.docks
      // this.currentUser ? this.docks.push(response.data.docks.find(u => u.id === this.currentUser.id)) : this.docks = [])
      var dock = response.data.docks.filter(u => u.id === this.currentUser.id)
      if (Array.isArray(dock)) {
        this.docks = dock
      } else {
        this.docks.push(dock)
      }
    },
    updateStocks () {
      this.axios.post(this.server_url + '/stock/updateStocks', this.docks)
    },
    dfind (place, kdock, kdeck = -1) {
      if (kdock === '' && kdeck === '') return false
      if (place === 'dock') {
        return this.docks.find(dock => dock.title === kdock)
      } else {
        // deck
        // console.log('deck title', ' ! ' + place + kdock + kdeck + ' ! ')
        return this.dfind('dock', kdock).decks.find(
          deck => deck.title === kdeck
        )
      }
    },
    add (place, kdock = -1) {
      var pack =
        place === 'dock' ? this.docks : this.dfind('dock', kdock).decks
      var input =
        place === 'dock' ? this.dockInput : this.dfind('dock', kdock).input
      if (input.placeholder === '') return
      if (
        pack.forEach(element => {
          if (element.title === input.placeholder) return true
        })
      ) {
        return
      }
      if (place === 'dock') {
        pack.push({
          id: this.currentUser.id,
          title: input.placeholder,
          input: {
            mode: 'add',
            title: '',
            placeholder: ''
          },
          decks: []
        })
      } else {
        pack.push({ title: input.placeholder, flashcards: [], success: 0 })
      }
      input.placeholder = ''
      this.updateStocks()
    },
    update (place, kdock = -1) {
      var pack =
        place === 'dock' ? this.docks : this.dfind('dock', kdock).decks
      var input =
        place === 'dock' ? this.dockInput : this.dfind('dock', kdock).input
      pack.find(item => item.title === input.oldTitle).title =
        input.placeholder
      var newInput = { mode: 'add', oldTitle: '', placeholder: '' }
      if (place === 'dock') this.dockInput = newInput
      else this.dfind('dock', kdock).input = newInput
      this.updateStocks()
    },
    updateInput (place, kdock, kdeck = -1) {
      var packObj =
        place === 'dock'
          ? this.dfind('dock', kdock)
          : this.dfind('deck', kdock, kdeck)
      if (packObj !== undefined) {
        var titleToUpdate = packObj.title
        var input = {
          mode: 'update',
          oldTitle: titleToUpdate,
          placeholder: titleToUpdate
        }
        if (place === 'dock') this.dockInput = input
        else this.dfind('dock', kdock).input = input // deck
      }
    },
    d_delete (place, kdock, kdeck = -1) {
      var placeToSearch =
        place === 'dock' ? this.docks : this.dfind('dock', kdock).decks
      var itemToDelete =
        place === 'dock'
          ? this.dfind('dock', kdock)
          : this.dfind('deck', kdock, kdeck)
      if (placeToSearch === undefined || itemToDelete === undefined) return
      placeToSearch.splice(placeToSearch.indexOf(itemToDelete), 1)
      this.updateStocks()
    },
    show_dialog (title, dialog, resetInput = true) {
      if (title !== '') dialog.title = title
      if (resetInput) {
        dialog.key = ''
        dialog.value = ''
      }
      dialog.show = true
    },
    selectItem (place, title) {
      if (place === 'dock') {
        this.selectedItem.dock = title
        this.selectedItem.deck = ''
        this.currentDeckComputed = ''
        // this.play_dialog.currentDeck = ''
        // console.log('dock', this.selectedItem.dock)
      } else {
        this.selectedItem.deck = title
        this.currentDeckComputed = this.currentFlashcards
        // this.play_dialog.currentDeck = this.currentFlashcards
        // console.log('deck', this.selectedItem.deck)
      }
    },
    show_card (key, value) {
      this.card_dialog.key = key
      this.card_dialog.value = value
      this.card_dialog.show = true
    },
    saveFlashcard (item, cardDialog) {
      if (this.currentFlashcardsCount >= 0) {
        this.dfind('deck', item.dock, item.deck).flashcards.push({
          key: cardDialog.key,
          value: cardDialog.value
        })
        this.updateStocks()
      }
      this.close_card(this.card_dialog, true, true)
    },
    dcard_update_start (inKey, inValue) {
      this.card_dialog.title = 'Modify Card'
      this.card_dialog.key = inKey
      this.card_dialog.value = inValue
      this.card_dialog.old_card.key = inKey
      this.card_dialog.old_card.value = inValue
      this.card_dialog.show = true
    },
    dcard_update_save (item, cardDialog) {
      if (this.currentFlashcardsCount > 0) {
        var deckCards = this.dfind(
          'deck',
          this.selectedItem.dock,
          this.selectedItem.deck
        ).flashcards
        if (deckCards !== undefined) {
          var itemToUpdate = deckCards.find(
            card =>
              card.key === cardDialog.old_card.key &&
              card.value === cardDialog.old_card.value
          )
          if (itemToUpdate !== undefined) {
            itemToUpdate.key = cardDialog.key
            itemToUpdate.value = cardDialog.value
            this.updateStocks()
          }
        }
      }
      this.close_card(this.card_dialog, true, true)
    },
    dcard_delete (inKey, inValue) {
      if (this.currentFlashcardsCount > 0) {
        var deckCards = this.dfind(
          'deck',
          this.selectedItem.dock,
          this.selectedItem.deck
        ).flashcards
        if (deckCards !== undefined) {
          var itemToDelete = deckCards.find(
            card => card.key === inKey && card.value === inValue
          )
          if (itemToDelete !== undefined) {
            deckCards.splice(deckCards.indexOf(itemToDelete), 1)
            this.updateStocks()
          }
        }
      }
    },
    close_card (
      dialog,
      defaultTitle = false,
      clearOldValue = false,
      resetCount = false
    ) {
      dialog.show = false
      if (defaultTitle) dialog.title = 'Card'
      dialog.key = ''
      dialog.value = ''
      if (clearOldValue) {
        dialog.old_card.key = ''
        dialog.old_card.value = ''
      }
      if (resetCount) dialog.currentCount = 0
      if (dialog.title === 'Examen') {
        this.selectCardAnswer(-1, true) // reset
        // console.log(this.dfind('deck', this.selectedItem.dock, this.selectedItem.deck))
        this.updateStocks()
      }
    },
    shift_card (dialog, direction) {
      var shift = direction === 'next' ? 1 : -1
      var i = dialog.currentCount + shift
      if (
        dialog.currentDeck !== undefined &&
        i < dialog.currentDeck.length &&
        i >= 0
      ) {
        var card = dialog.currentDeck[i]
        // console.log('card', card)
        // console.log('before set', dialog)
        // console.log('card value', card.key + ' + ' + card.value)
        dialog.key = card.key
        dialog.value = card.value
        dialog.currentCount += shift
        this.selectCardAnswer(-1, true) // reset
        // console.log('playcard value', dialog.key + ' + ' + dialog.value)
        // console.log('after set', dialog)
      }
    },
    show_play_cards (dialog) {
      // this.shift_card(dialog)
      var first = dialog.currentCount // 0
      if (
        dialog.currentDeck !== undefined &&
        first < dialog.currentDeck.length
      ) {
        var card = dialog.currentDeck[first]
        dialog.key = card.key
        dialog.value = card.value
      }
      this.show_dialog(this.play_dialog.title, dialog, false)
      if (this.play_dialog.title === 'Examen' && this.selectedItem.deck !== '' && this.selectedItem.dock !== '') {
        this.dfind(
          'deck',
          this.selectedItem.dock,
          this.selectedItem.deck
        ).success = 0
      }
      // this.check(this.currentExamenCardAnswers)
      // this.check(this.play_dialog.answerButtons)
    },
    set_rules () {
      this.rules.required = value => !!value || this.textes[this.no_langue][19]
      this.rules.min = v => v.length >= 2 || this.textes[this.no_langue][20]
    },
    shuffle (array) {
      var currentIndex = array.length
      var temporaryValue
      var randomIndex
      while (currentIndex !== 0) {
        // While there remain elements to shuffle...
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    },
    selectCardAnswer (i, reset = false, correct) {
      if (reset) this.play_dialog.currentCard.answerSelected = i
      else {
        if (this.play_dialog.currentCard.answerSelected === -1) {
          this.play_dialog.currentCard.answerSelected = i
        }
        if (correct && this.selectedItem.deck !== '' && this.selectedItem.dock !== '') {
          this.dfind(
            'deck',
            this.selectedItem.dock,
            this.selectedItem.deck
          ).success += 1
        }
      }
    },
    check (show) {
      // console.log(show)
    }
  },
  watch: {
    no_langue: function () {
      this.set_rules()
    }
  },
  computed: {
    currentFlashcardsCount: function () {
      if (this.selectedItem.dock !== '' && this.selectedItem.deck !== '') {
        var cardsCount = this.dfind(
          'deck',
          this.selectedItem.dock,
          this.selectedItem.deck
        ).flashcards.length
        if (cardsCount !== undefined && cardsCount >= 0) return cardsCount
        else return -1
      } else return -1
    },
    currentFlashcards: function () {
      // peut être simplfier avec currentDeckComputed
      if (this.selectedItem.dock !== '' && this.selectedItem.deck !== '') {
        var cards = this.dfind(
          'deck',
          this.selectedItem.dock,
          this.selectedItem.deck
        ).flashcards
        if (cards !== undefined && cards.length > 0) return cards
        else return undefined
      } else return undefined
    },
    currentDeckComputed: {
      // peut être simplfier avec currentFlashcards
      get: function () {
        return this.play_dialog.currentDeck
      },
      set: function (newDeck) {
        this.play_dialog.currentDeck = newDeck
        this.play_dialog.currentCount = 0
        // console.log('dialog setter', this.play_dialog)
      }
    },
    currentExamenCardAnswers: function () {
      if (this.play_dialog.title !== 'Examen') return undefined
      var cards = this.play_dialog.currentDeck
      if (cards === undefined) return undefined
      var cardsSize = cards.length
      var currentCard = cards[this.play_dialog.currentCount]
      if (currentCard === undefined) return undefined
      var answers = []
      if (this.play_dialog.examen.key) {
        answers.push({ text: currentCard.key, correct: true, show: false })
      } else {
        answers.push({ text: currentCard.value, correct: true, show: false })
      }
      var allIndex = Array.from(Array(cardsSize).keys())
      if (cardsSize > 1) { // allIndex.length = cardsSize
        allIndex.splice(allIndex.indexOf(this.play_dialog.currentCount), 1)
        allIndex = this.shuffle(allIndex)
        var answwersNumber = (cardsSize > 4) ? 4 : cardsSize
        if (this.play_dialog.examen.key) {
          for (let i = 0; i < answwersNumber - 1; i++) {
            answers.push({
              text: cards[allIndex[i]].key,
              correct: false,
              show: false
            })
          }
        } else {
          for (let i = 0; i < answwersNumber - 1; i++) {
            answers.push({
              text: cards[allIndex[i]].value,
              correct: false,
              show: false
            })
          }
        }
        answers = this.shuffle(answers)
      }
      return answers
    }
  },
  created () {
    if (sessionStorage.getItem('currentUser') === null) {
      alert(this.textes[this.no_langue][18])
      this.$router.push('/login')
    } /* else if (this.deck.flashcards.length) {
      this.card_dialog.title = ''
    } */
    this.set_rules()
    this.getStocks()
    // Quand on se renvoi un objet, on renvoi sa référence qui reste inchangé
    // var arr = [{x:'a', y: 'b'}, {x:'c', y: 'd'}]
    // var obj = arr.find(obj => obj.x==='a')
    // obj.x = 'z'
    // console.log('arr', arr)
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
