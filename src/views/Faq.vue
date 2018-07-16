<template>
    <div class="page faq">

        <div class="page-header">
            <h2 class="page-heading">
                Frequently Asked Questions
            </h2>
        </div>

        <h3>What papers are included in OSCAR?</h3>
        <p>
            We've included all papers submitted as part of an <a href="https://intramural.nih.gov/">Annual NIH Report</a> in the last five years by NIMH Principal Investigators.
        </p>


        <h3>How do you determine if a paper is open?</h3>
        <p>
            A paper is considered Open if it there is a copy of it in PMC.  Publishing in an Open Access journal is great, but isn't in compliance with the NIH Public Access policy unless it is also in PMC.
        </p>

        <h3>How do you determine if a paper has open code?</h3>
        <p>
            We scan the text of each paper to see if it mentions open-source code associated with the study. For this prototype version, we use a trivial scanning algorithm: we just seach for the word "github".  This will improve in later versions, leveraging techniques created for a
            <a href="http://blog.impactstory.org/collaborating-635k-grant-improve-credit-research-software/">related grant.</a>

            For now, if you've published a paper with open code that we haven't discovered (or have an example of a paper which we mistakenly label as open code), please
            <a href="mailto:team@impactstory.org">team@impactstory.org.</a>
        </p>

        <h3>How do you determine if a paper has open data?</h3>
        <p>
            We scan each paper to see if it mentions open data associated with the study. As with code, for now we do this in a pretty simple way: we look in the papers for the words Dryad, Figshare, Dataverse, NDAR, and Openneuro.org. Over time we expect to deploy more subtle NLP-based techniques. f you've published a paper with open data that we haven't discovered (or have an example of a paper which we mistakenly label as open data), please
            <a href="mailto:team@impactstory.org">let us know</a> and we will improve the algorithm to handle that case.
        </p>




    </div>
</template>

<script>

    export default {
        name: 'faq',
        data: () => ({
        }),
        components: {
        },
        metaInfo() {
            return {
                title: "FAQ"
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>


<style scoped lang="scss">

    .page-header {
        h2 {
            margin: 0;
        }
        margin-bottom: 50px;
    }
    h3 {
        margin-bottom: 0;
        padding-bottom: 0;
    }
    p {
        margin-top: 0;
        padding-top: 0;
    }



</style>
