<template>
  <div class="page home">

    <!--<div class="section-header pis">-->
      <!--<h2>-->
        <!--History-->
        <!--<span class="num" v-if="!isLoadingPapers">({{ papers.length }})</span>-->
        <!--<md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="3" v-if="isLoadingPapers"></md-progress-spinner>-->
      <!--</h2>-->

    <!--</div>-->




    <div class="section-header pis">
      <div class="main-content">
        <h2>
          Principal and Lead Investigators
          <span class="num" v-if="!isLoadingPersons">({{ searchedPersons.length }})</span>
          <md-progress-spinner md-mode="indeterminate" :md-diameter="20" :md-stroke="3" v-if="isLoadingPersons"></md-progress-spinner>
        </h2>
        <p>Click on an investigator to zoom in.</p>
      </div>

      <div class="spacer"></div>

      <div class="controls">
        <a href="mailto:team@impactstory.org">Report errors</a>
        <a href="http://osat-api.herokuapp.com/persons">JSON</a>

      </div>




    </div>

<md-table v-model="searchedPersons" md-sort="name.family" md-sort-order="asc" >

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
          <!--<span class="suffix-names">-->
            <!--{{ item.name.suffix }}-->
          <!--</span>-->
        </md-table-cell>

        <md-table-cell md-label="Total Papers" md-sort-by="num_papers" md-numeric>{{ item.num_papers }}</md-table-cell>
        <md-table-cell md-label="% Open Papers" md-sort-by="scores.paper" md-numeric>{{ Math.floor(item.scores.paper * 100) }}</md-table-cell>
        <md-table-cell md-label="% Open Data" md-sort-by="scores.data" md-numeric>{{ Math.floor(item.scores.data * 100) }}</md-table-cell>
        <md-table-cell md-label="% Open Code" md-sort-by="scores.code" md-numeric>{{ Math.floor(item.scores.code * 100) }}</md-table-cell>


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
            isLoadingPapers: true,
            isLoadingPersons: true,
            persons: [],
            search: null,
            searchedPersons: [],
            papers: []
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
                        this.isLoadingPersons = false
                        console.log("got this back: ", this.persons)
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.isLoadingPersons = false
                    })
            },
            loadPapers() {
                console.log("loading papers!")
                let url = "http://osat-api.herokuapp.com/papers"
                axios.get(url)
                    .then(resp => {
                        this.papers = resp.data.results
                        this.isLoadingPapers = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.isLoadingPapers = false
                    })
            },
            goToPerson(id){
                console.log("go to person", id)
                this.$router.push("/person/" + id)
            }
        },
        mounted() {
            if (this.persons.length === 0) {
              this.loadPersons()
              this.loadPapers()

            }
        }
    }
</script>


<style scoped lang="scss">

  td {
    cursor: pointer;
  }

  .suffix-names {
    font-size: 70%;
  }

  .section-header {
    display: flex;
    margin-bottom: 50px;
    align-items: flex-end;
    .content {

    }
    .spacer {
      flex: 1;
    }
    .controls {
      font-size: 12px;
      margin-bottom: 3px;
      a {
        padding: 3px 5px;
      }
    }
  }

  .section-header.pis {



    h2 {
      margin: 0;
      span.num {
        font-size: 50%;
      }

    }
    p {
      margin: 0;
      font-size: 12px;
    }

  }




</style>
