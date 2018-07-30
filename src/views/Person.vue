<template>
    <div class="page person">


        <div class="page-header">
            <div class="back-link">
                <router-link to="/">
                    <i class="fas fa-chevron-left"></i>
                    Investigators
                </router-link>
            </div>
            <h2 class="page-heading">
                <span class="given-names">
                    {{ name.given }}
                    {{ name.middle }}
                </span>
                <span class="family-names">
                    {{ name.family }}
                </span>
                <!--<span class="suffix-names">-->
                    <!--{{ name.suffix }}-->
                <!--</span>-->
            </h2>
        </div>


        <div class="section-header">
            <div class="main-content">
                <h3>
                    Papers
                    <span class="num">({{ searchedPapers.length }})</span>
                </h3>
                <p>Click a paper to view it on PubMed</p>
            </div>
            <div class="spacer"></div>
            <div class="controls">
                <a href="mailto:team@impactstory.org">Report errors</a>
                <a :href="'http://osat-api.herokuapp.com/person/' + personId">JSON</a>
            </div>
        </div>

        <md-table v-model="searchedPapers" md-sort="metadata.year" md-sort-order="asc" >


            <md-table-row slot="md-table-row" slot-scope="{ item }" v-on:click="goToPubmed(item.pmid)">
                <md-table-cell md-label="year" md-sort-by="metadata.year">
                    {{ item.metadata.year }}
                </md-table-cell>
                <md-table-cell md-label="Title" md-sort-by="metadata.title">
                    {{ item.metadata.title }}
                </md-table-cell>

                <md-table-cell md-label="Paper" md-sort-by="open_status.paper">
                    <i class="fas fa-check" v-if="item.open_status.paper=='open'"></i>
                    <i class="fas fa-times" v-if="item.open_status.paper=='closed'"></i>
                    <span class="embargo" v-if="item.open_status.paper=='embargo'">
                        <i class="fas fa-hourglass-half"></i>
                        <md-tooltip>Open pending embargo</md-tooltip>
                    </span>
                    <span class="embargo" v-if="item.open_status.paper=='na'">
                        NA
                        <md-tooltip>It's impossible for this paper to be open.</md-tooltip>
                    </span>
                </md-table-cell>

                <md-table-cell md-label="Data" md-sort-by="open_status.data" md-boolean>
                    <i class="fas fa-check" v-if="item.open_status.data=='open'"></i>
                    <i class="fas fa-times" v-if="item.open_status.data=='closed'"></i>
                    <span class="embargo" v-if="item.open_status.paper=='na'">
                        NA
                        <md-tooltip>No data was gathered.</md-tooltip>
                    </span>
                </md-table-cell>

                <md-table-cell md-label="Code" md-sort-by="open_status.code" md-boolean>
                    <i class="fas fa-check" v-if="item.open_status.code=='open'"></i>
                    <i class="fas fa-times" v-if="item.open_status.code=='closed'"></i>
                    <span class="embargo" v-if="item.open_status.paper=='na'">
                        NA
                        <md-tooltip>No code was used.</md-tooltip>
                    </span>
                </md-table-cell>




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
            name: {},
            webpage: null
        }),
        components: {
            axios
        },
        metaInfo() {
            return {
                title: this.fullName
            }
        },
        computed: {
            fullName() {
                if (this.name){
                    return this.name.given + " "
                        + this.name.middle + " "
                        + this.name.family
                }
                else {
                    return "Unknown name"
                }
            },
            personId() {
                return this.$route.params.id
            }
        },
        methods: {
            goToPubmed(pmid){
                window.location.href = "https://www.ncbi.nlm.nih.gov/pubmed/" + pmid
            },
            loadPapers() {
                console.log("loading papers!")
                let url = "http://osat-api.herokuapp.com/person/" + this.personId
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
                        this.webpage = resp.data.nih_webpage
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

    .page-header {
        h2 {
            margin: 0;
        }
        border-bottom: 1px solid #333;
        margin-bottom: 60px;
    }
    .section-header {
        display: flex;
        margin-bottom: 20px;
        align-items: flex-end;
        margin-top: 10px;
        border-bottom: 1px solid #eee;
        h3 {
            margin: 0;
        }
        p {
            margin: 0;
            font-size: 12px;
        }
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

    .fa-times {
        opacity: .5;
        color: red;
    }
    .fa-check {
        color: green;
    }
    .fa-hourglass-half {
        color: gold;
    }

    td {
        cursor: pointer
    }



</style>
