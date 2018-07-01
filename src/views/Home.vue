<template>
  <div class="page home">

<md-table v-model="searchedPersons" md-sort="name.family" md-sort-order="asc" >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h2>
            People
            <span class="num">({{ searchedPersons.length }})</span>
          </h2>
        </div>

        <!--<md-field md-clearable class="md-toolbar-section-end">-->
          <!--<md-input placeholder="Search by PI name..." v-model="search" @input="searchOnTable" />-->
        <!--</md-field>-->
      </md-table-toolbar>

      <!--<md-table-empty-state-->
        <!--md-label="No users found"-->
        <!--:md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">-->
      <!--</md-table-empty-state>-->

      <md-table-row slot="md-table-row" slot-scope="{ item }" v-on:click="goToPerson(item.id)">
        <md-table-cell md-label="Name" md-sort-by="name.family">
          <span class="given-names">
            {{ item.name.given }}
            {{ item.name.middle }}
          </span>
          <span class="family-names">
            {{ item.name.family }}
          </span>
          <span class="suffix-names">
            {{ item.name.suffix }}
          </span>
        </md-table-cell>

        <md-table-cell md-label="Papers" md-sort-by="num_papers" md-numeric>{{ item.num_papers }}</md-table-cell>
        <md-table-cell md-label="Overall Open %" md-sort-by="scores.total" md-numeric>{{ Math.floor(item.scores.total * 100) }}</md-table-cell>
        <md-table-cell md-label="papers" md-sort-by="scores.oa" md-numeric>{{ Math.floor(item.scores.oa * 100) }}</md-table-cell>
        <md-table-cell md-label="data" md-sort-by="scores.data" md-numeric>{{ Math.floor(item.scores.data * 100) }}</md-table-cell>
        <md-table-cell md-label="code" md-sort-by="scores.code" md-numeric>{{ Math.floor(item.scores.code * 100) }}</md-table-cell>


        <!--<md-table-cell md-label="Email" md-sort-by="email">{{ item.name.family }}</md-table-cell>-->
        <!--<md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>-->
        <!--<md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>-->
      </md-table-row>
    </md-table>




  </div>
</template>

<script>
    import axios from 'axios'
    import router from 'vue-router'
    const toLower = text => {
      return text.toString().toLowerCase()
    }

    const searchByName = (items, term) => {
      if (term) {
        return items.filter(item => toLower(item.name).includes(toLower(term)))
      }

      return items
    }

    export default {
        name: 'home',
        data: () => ({
            isLoading: true,
            persons: [],
            search: null,
            searchedPersons: []
        }),
        components: {
            axios
        },
        metaInfo: {
            title: 'People'
        },
        computed: {

        },
        methods: {
            loadPersons() {
                console.log("loading persons!")
                let url = "http://osat-api.herokuapp.com/persons"
                axios.get(url)
                    .then(resp => {
                        this.persons = resp.data.results
                        this.searchedPersons = this.persons
                        this.loading = false
                        console.log("got this back: ", this.persons)
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.loading = false
                    })
            },
            goToPerson(id){
                console.log("go to person", id)
                this.$router.push("/person/" + id)
            }
        },
        mounted() {
            this.loadPersons()
        }
    }
</script>


<style scoped lang="scss">

  .suffix-names {
    font-size: 50%;
  }
  h2 span.num {
    font-size: 50%;

  }



</style>
