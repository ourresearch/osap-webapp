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
            <div class="biblio-line authors">
                {{biblio.authors}}
            </div>

            <div class="biblio-line publication">
                <span class="year">{{biblio.year}} </span>
                <span class="journal">{{biblio.journal}}</span>
            </div>
            <div class="biblio-line linkouts">
                <a :href="'http://doi.org/' + biblio.doi">Publisher page</a>
                <span class="sep"> | </span>
                <a :href="biblio.pubmed_url">PubMed page</a>
            </div>
            <div class="abstract biblio-line">
                <h4>Abstract</h4>
                {{biblio.abstract}}
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


        <div class="open-type-cards">
            <div class="open-type-card" v-for="(openType) in openTypes">

                <div class="mode display" v-show="!openType.editMode">
                    <div class="open-type-name">
                        {{ openType.name }}
                    </div>

                    <!--NA-->
                    <div class="na val" v-if="openType.val=='na'">
                        <div class="main">
                            <span class="icon">NA </span>
                            <strong>Not applicable </strong>
                        </div>
                        <div class="paren">The resource doesn't exist at all, or is impossible to share.</div>
                    </div>

                    <!--open-->
                    <div class="open val" v-if="openType.val=='open'">
                        <div class="main">
                            <i class="fas fa-check"></i>
                            <strong>Open </strong>
                        </div>
                        <div class="paren">The resource is free for anyone to download and use</div>
                    </div>

                    <!--closed-->
                    <div class="closed val" v-if="openType.val=='closed'">
                        <div class="main">
                            <i class="fas fa-times"></i>
                            <strong>Closed </strong>
                        </div>
                        <div class="paren">We couldn't find evidence of an openly shared copy.</div>
                    </div>

                    <!--embargo-->
                    <div class="closed val" v-if="openType.val=='embargo'">
                        <div class="main">
                            <i class="fas fa-hourglass-half"></i>
                            <strong>Embargoed </strong>
                        </div>
                        <div class="paren">This will become open after the end of an embargo period.</div>
                    </div>

                    <md-button class="edit md-raised" @click="openType.editMode=true">
                        edit
                    </md-button>
                </div>


                <div class="mode edit" v-show="openType.editMode">
                    edit mode!
                    <md-button class="save md-raised" @click="openOpenEditStatusDialog(name, val)">
                        save
                    </md-button>
                </div>





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
            biblio: {},
            openTypes: {}
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
            changePaperStatus() {
            //    paper/26654786/open_status/code
            //    '{"open_status":"open"}'
            },

            loadPaper() {
                console.log("loading paper!")
                let url = "http://osat-api.herokuapp.com/paper/" + this.paperId
                axios.get(url)
                    .then(resp => {
                        console.log("got paper back", resp)
                        this.biblio = resp.data.metadata

                        this.openTypes = Object.entries(resp.data.open_status).map(function(namePair){
                            return {
                                name: namePair[0],
                                val: namePair[1],
                                editMode: false
                            }
                        })

                        console.log("opentypes", this.openTypes)



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
        /*border-bottom: 1px solid #333;*/
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

    .biblio-line {
        font-size: 14px;
    }
    .abstract {
        padding-bottom: 10px;
    }
    h4 {
        margin-bottom: 0;
    }

    .open-type-cards {
        display: flex;
        @media (max-width: 600px) {
            flex-wrap: wrap;
        }
        .open-type-card {
            border: 1px solid #eee;
            box-shadow: 1px 1px 3px #ccc;
            margin: 5px;
            padding: 10px;
            width: 350px;

            .open-type-name {
                font-weight: bold;
                font-size: 28px;
                text-transform: capitalize;
            }
            .val {
                .main {
                    i {margin-right: 3px;}
                    margin-bottom: 5px;
                }
                .paren {
                    font-size: 14px;
                }
            }
        }

    }




</style>
