pipeline {
    agent any
    environment {
        CI = "true"
        registry = "bpun1p/server"
        registryCredential = "dockerhub_id"
    }
    tools {
        nodejs "node"
        "org.jenkinsci.plugins.docker.commons.tools.DockerTool" "docker"
    }
    stages {
        stage("init") {
            steps {
                script {
                   CODE_CHANGES = currentBuild.changeSets.size() > 0
                }
            }
        }
        stage("checkout") {
            steps {
                checkout scm
            }
        }
        stage("build image") {
            when {
                expression {
                    script {
                        CODE_CHANGES == true
                    }
                }
            }
            steps {
                script {
                   dockerImage = docker.build(registry + ":$BUILD_NUMBER")
                }
            }
        }
        stage("Deploy Image") {
            when {
                expression {
                    script {
                        CODE_CHANGES == true
                    }
                }
            }
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", registryCredential) {
                        dockerImage.push();
                    }
                }
            }
        }
        stage("clean up image") {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}