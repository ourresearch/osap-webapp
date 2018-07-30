<template>
    <div class="page person">


        <div class="page-header">
            <div class="back-link">
                <router-link to="../">
                    <i class="fas fa-chevron-left"></i>
                    {{personName}}
                </router-link>
            </div>
            <h2 class="page-heading">
                {{ biblio.title }}
            </h2>
            <div class="biblio-line">
                {{biblio.authors}}
            </div>
            <div class="biblio-line">
                <span class="year">{{biblio.year}} </span>
                <span class="journal">{{biblio.journal}}</span>
            </div>
        </div>


        <div class="section-header">
            <div class="main-content">
                <h3>
                    Open status
                </h3>
            </div>
            <div class="spacer"></div>
            <div class="controls">
                <a href="mailto:team@impactstory.org">Report errors</a>
                <a :href="'http://osat-api.herokuapp.com/paper/' + paperId">JSON</a>
            </div>
        </div>

        <div class="open-type" v-for="(val, name) in openStatus">
            <span class="open-type">
                {{ name }} is
            </span>
            <span class="na val" v-if="val=='na'">
                <span class="icon">NA </span>
                <strong>Not applicable </strong>
                <span class="paren">(The resource doesn't exist at all, or is impossible to share.)</span>
            </span>
            <span class="open val" v-if="val=='open'">
                <i class="fas fa-check"></i>
                <strong>Open </strong>
                <span class="paren">(The resource is free for anyone to download and use)</span>
            </span>
            <span class="na closed" v-if="val=='closed'">
                <i class="fas fa-times"></i>
                <strong>Closed </strong>
                <span class="paren">(We couldn't find evidence of an openly shared copy.)</span>
            </span>
            <span class="na embargo" v-if="val=='embargo'">
                <i class="fas fa-hourglass-half"></i>
                <strong>Embargoed </strong>
                <span class="paren">(This will become open after the end of an embargo period.)</span>
            </span>
        </div>






    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'paper',
        data: () => ({
            isLoading: true,
            personName: "",
            biblio: {},
            openStatus: {}
        }),
        components: {
            axios
        },
        metaInfo() {
            return {
                title: "paper"
            }
        },
        computed: {
            paperId() {
                return this.$route.params.paperId
            },
            personId() {
                return this.$route.params.personId
            }
        },
        methods: {
            goToPubmed(pmid){
                window.location.href = "https://www.ncbi.nlm.nih.gov/pubmed/" + pmid
            },
            loadPerson() {
                console.log("loading paper!")
                let url = "http://osat-api.herokuapp.com/person/" + this.personId
                axios.get(url)
                    .then(resp => {
                        console.log("got person back", resp)
                        let name = "Unknown name"
                        if (resp.data.name){
                            name = resp.data.name.given + " "
                                + resp.data.name.middle + " "
                                + resp.data.name.family
                        }
                        this.personName = name
                    })

            },

            loadPaper() {
                console.log("loading paper!")
                let url = "http://osat-api.herokuapp.com/paper/" + this.paperId
                axios.get(url)
                    .then(resp => {
                        console.log("got paper back", resp)
                        this.biblio = resp.data.metadata
                        this.openStatus = resp.data.open_status

                        // let papers = resp.data.papers.map(function(paper){
                        //     let ret = paper
                        //     ret.is_open.paper = paper.is_open.paper + 0
                        //     ret.is_open.data = paper.is_open.data + 0
                        //     ret.is_open.code = paper.is_open.code + 0
                        //     return ret
                        // })
                        //
                        // this.name = resp.data.name
                        // this.webpage = resp.data.nih_webpage
                        // this.searchedPapers = papers
                        // this.loading = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.isLoading = false
                    })
            }
        },
        mounted() {
            this.loadPaper()
            this.loadPerson()
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




</style>
