node {
    def git = checkout scm
    
    stage("Clean") {
        sh "echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'"
        sh "git clean -dfxq"
        sh "git stash"
    }
    stage("Setup") {
        sh "npm install --prefix game_api"
        sh "npm install --prefix game_client"
    }
    stage("ESLint Tests") {
        sh "npm run eslint --prefix game_api"
    }

    stage("Unit Testing") {
        sh "npm run test:unit --prefix game_api"
        step([
            $class: 'CloverPublisher',
            cloverReportDir: 'coverage',
            cloverReportFileName: 'clover.xml',
            healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
            unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
            failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
        ])
    }

    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("Testing API") {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} apitest"
        dir("./game_api"){
            sh "./../scripts/api_test.sh"
        }
        dir("/var/lib/jenkins/terraform/hgop/apitest"){
            sh "terraform destroy -auto-approve -var enviroment=apitest || exit 1"
        }
    }
    stage("Testing Capacity") {

        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT} capacitytest"
        dir("./game_api"){
            sh "./../scripts/capacity_test.sh"
        }
        dir("/var/liv/jenkins/terraform/hgop/capacitytest"){
            sh "terraform destroy -auto-approve -var enviroment=capacitytest || exit 1"
        }
    }
    
    stage("Deploy") {
        sh "./scripts/jenkins_deploy.sh ${git.GIT_COMMIT}" 
    }

}