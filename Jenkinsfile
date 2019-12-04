node {
    def git = checkout scm
    stage("Clean") {
        sh "echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'"
        sh "git clean -dfxq"
        sh "git stash"
    }
    stage("Install") {
        sh "npm install --prefix game_api"
    }
    stage("ESLint Tests") {
        sh "npm run eslint --prefix game_api"
    }

    stage("Unit Testing") {
        sh "npm run test:unit --prefix game_api"
    }

    stage("Deploy") {
        sh "./scripts/jenkins_deploy.sh"
    }

    stage("Build") {
        echo "${git.GIT_COMMIT}"
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

}