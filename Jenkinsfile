pipeline {
    agent any 
        stages {
            stage("build"){
                steps{
                    echo "Started building the app..."
                    nodejs('Node'){
                        sh 'npm install'
                    }
                    echo "Installed npm packages"
                }
            }
            stage("test"){
                steps{
                    echo "Started testing the app..."
                }
            }
            stage("deploy"){
                steps{
                    echo "Started deploying the app..."
                }
            }
        }
    
}