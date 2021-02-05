pipeline {
    agent any
    environment {
        env_vars_fe = credentials("env_vars_fe")
        aws_ecr_pass = credentials("aws_ecr_pass")
    }
    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/vitaliy-pavlyshyn/pixelistic_fe.git'
            }
        }
        stage('Download .env file') {
            steps {
                withCredentials([file(credentialsId: 'env_vars_fe', variable: 'envfile')]) {
                    sh "cp $envfile .env"
                }
            }
        }
        stage('Build a container') {
            steps {
                withCredentials([string(credentialsId: 'aws_ecr_pass', variable: 'PW')]) {
                    sh "sudo docker login --username AWS --password $PW public.ecr.aws/t0q9r0m9 \
                    && sudo docker build -t pixelistic_fe ."
                }
            }
        }
        stage('Push to registry') {
            steps {
                sh "sudo docker tag pixelistic_fe:latest public.ecr.aws/t0q9r0m9/pixelistic_fe:latest && sudo docker push public.ecr.aws/t0q9r0m9/pixelistic_fe:latest"
            }
        }
    }
    post { 
        always { 
            cleanWs()
        }
    }
}