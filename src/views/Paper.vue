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
        </div>


        <div class="section-header">
            <div class="main-content">
                <h3>
                    Papers
                </h3>
            </div>
            <div class="spacer"></div>
            <div class="controls">
                <a href="mailto:team@impactstory.org">Report errors</a>
                <a :href="'http://osat-api.herokuapp.com/paper/' + paperId">JSON</a>
            </div>
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
            biblio: {}
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
