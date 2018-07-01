<template>
    <div class="page person">


        <h2>
            <div class="back">
                <router-link to="/">
                    < back
                </router-link>
            </div>
            <span class="given-names">
            {{ name.given }}
            {{ name.middle }}
          </span>
            <span class="family-names">
            {{ name.family }}
          </span>
            <span class="suffix-names">
            {{ name.suffix }}
          </span>
        </h2>

        <md-table v-model="searchedPapers" md-sort="year" md-sort-order="asc" >
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h3>
                        Papers
                        <span class="num">({{ searchedPapers.length }})</span>
                    </h3>

                </div>

                <!--<md-field md-clearable class="md-toolbar-section-end">-->
                <!--<md-input placeholder="Search by PI name..." v-model="search" @input="searchOnTable" />-->
                <!--</md-field>-->
            </md-table-toolbar>

            <!--<md-table-empty-state-->
            <!--md-label="No users found"-->
            <!--:md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">-->
            <!--</md-table-empty-state>-->

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Title" md-sort-by="metadata.title">
                    {{ item.metadata.title }}
                </md-table-cell>

                <md-table-cell md-label="Paper" md-sort-by="is_open.paper" md-boolean>{{ item.is_open.paper }}</md-table-cell>
                <md-table-cell md-label="Data" md-sort-by="is_open.data" md-boolean>{{ item.is_open.data }}</md-table-cell>
                <md-table-cell md-label="Code" md-sort-by="is_open.code" md-boolean>{{ item.is_open.code }}</md-table-cell>



                <!--<md-table-cell md-label="Overall Open %" md-sort-by="scores.total" md-numeric>{{ Math.floor(item.scores.total * 100) }}</md-table-cell>-->
                <!--<md-table-cell md-label="papers" md-sort-by="scores.oa" md-numeric>{{ Math.floor(item.scores.oa * 100) }}</md-table-cell>-->
                <!--<md-table-cell md-label="data" md-sort-by="scores.data" md-numeric>{{ Math.floor(item.scores.data * 100) }}</md-table-cell>-->
                <!--<md-table-cell md-label="code" md-sort-by="scores.code" md-numeric>{{ Math.floor(item.scores.code * 100) }}</md-table-cell>-->


                <!--<md-table-cell md-label="Email" md-sort-by="email">{{ item.name.family }}</md-table-cell>-->
                <!--<md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>-->
                <!--<md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>-->
            </md-table-row>
        </md-table>




    </div>
</template>

<script>
    import axios from 'axios'
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
            papers: [],
            search: null,
            searchedPapers: [],
            name: {}
        }),
        components: {
            axios
        },
        metaInfo: {
            title: 'Papers'
        },
        computed: {
        },
        methods: {
            loadPapers() {
                console.log("loading papers!")
                let personId = this.$route.params.id
                let url = "http://osat-api.herokuapp.com/person/" + personId
                axios.get(url)
                    .then(resp => {



                        let papers = resp.data.papers.map(function(paper){
                            let ret = paper
                            ret.is_open.paper = paper.is_open.paper + 0
                            ret.is_open.data = paper.is_open.data + 0
                            ret.is_open.code = paper.is_open.code + 0
                            return ret
                        })

                        this.name = resp.data.name
                        this.searchedPapers = papers
                        this.loading = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.loading = false
                    })
            }
        },
        mounted() {
            this.loadPapers()
        }
    }
</script>


<style scoped lang="scss">

    .back {
        font-size: 50%;
    }

    .suffix-names {
        font-size: 50%;
    }
    h2 span.num {
        font-size: 50%;

    }



</style>
