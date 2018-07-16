<template>
    <md-toolbar class="main-header">
        <div class="brands">
            <a class="us" href="/">
                <span class="main">OSCAR</span>
                <span class="extra">
                     open science compliance and assessment report
                </span>
            </a>
            <a class="institution" href="./">National Institute of Mental Health</a>

        </div>
        <div class="nav">
            <router-link to="./faq">FAQ</router-link>
        </div>
    </md-toolbar>


</template>

<script>

    export default {
        name: 'MainHeader'
    }
</script>

<style scoped lang="scss">
    .brands {
        flex: 1;
        display: flex;
        padding: 15px;
        align-items: center;
        a.us {
            line-height: .8;
            border-right: 1px solid;
            padding: 0 10px 0 0;
            text-align: right;
            margin-right: 10px;
            display: block;
            width: 8.5em;
            &:hover {
                text-decoration: none;
            }
            .main {
                font-size: 32px;
                display: block;
            }
            .extra {
                font-size: 11px;

            }
        }
        .institution {
            font-size: 18px;
            color: #333;
            max-width: 10em;
        }
    }
    .nav {
        margin-right: 10px;
        a {
            font-size: 18px;
            padding: 5px;
            display: block;
        }
    }


</style>