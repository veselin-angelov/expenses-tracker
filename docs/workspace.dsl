workspace "Expenses Tracker" {

    model {
        ExpensesTracker = softwareSystem "Expenses Tracker" {
            BEApplication = container "BackEnd Application (API)" "Expenses tracking" "NodeJS with NestJS" {
                tags "Application"
            }

            FEApplication = container "FrontEnd Application" "Expenses traking" "React SPA Application" {
                tags "Application"
            }

            Storage = container "Storage" "Stores information about expenses." "PostgreSQL" {
                tags "Database"

                database = component "Database" "Relational database schema" {
                    tags "Database"
                }

                s3 = component "S3" "Cloud object storage" {
                    tags "Database"
                }
            }
        }

        dev = deploymentEnvironment "Production" {
            deploymentNode "Amazon Web Services" {
                tags "Amazon Web Services - Cloud"

                deploymentNode "EU-CENTRAL-1" {
                    tags "Amazon Web Services - Region"

                    route53 = infrastructureNode "Route 53" {
                        description "Highly available and scalable cloud DNS service."
                        tags "Amazon Web Services - Route 53"
                    }

                    cloudFront = infrastructureNode "CloudFront" {
                        description "Content delivery network (CDN)."
                        tags "Amazon Web Services - CloudFront"
                    }

                    s3Infrastructure = infrastructureNode "S3" {
                        description "Cloud object storage."
                        tags "Amazon Web Services - Simple Storage Service S3"
                    }

                    elb = infrastructureNode "Elastic Load Balancer" {
                        description "Automatically distributes incoming application traffic."
                        tags "Amazon Web Services - Elastic Load Balancing"
                    }

                    deploymentNode "Amazon EC2" {
                        tags "Amazon Web Services - EC2"

                        BEApplicationInstance = containerInstance BEApplication {
                            tags "Instance"
                        }
                    }

                    deploymentNode "Front End Node" {
                        tags "Amazon Web Services - Simple Storage Service S3"

                        FEApplicationInstance = containerInstance FEApplication {
                            tags "Instance"
                        }
                    }

                    deploymentNode "Amazon RDS" {
                        tags "Amazon Web Services - RDS"

                        deploymentNode "PostgreSQL" {
                            tags "Amazon Web Services - RDS PostgreSQL instance"

                            databaseInfrastructure = infrastructureNode "Database" {
                                description "Relational database schema"
                                tags "Database"
                            }
                        }
                    }
                }
            }

            route53 -> elb "Forwards requests to" "HTTPS"
            route53 -> cloudFront "Forwards requests to" "HTTPS"

            cloudFront -> FEApplicationInstance "Forwards requests to" "HTTPS"
            FEApplicationInstance -> elb "Communicates with" "HTTPS"

            elb -> BEApplicationInstance "Forwards requests to" "HTTPS"

            BEApplicationInstance -> databaseInfrastructure "Writes data to" "HTTPS"
            BEApplicationInstance -> s3Infrastructure "Writes data to" "HTTPS"
        }
    }

    views {
        deployment ExpensesTracker "Production" "AmazonWebServicesDeployment" {
            include *
        }

        styles {
            element "Instance" {
                color black
                background white
            }

            element "Database" {
                shape cylinder
            }
        }

        themes default https://static.structurizr.com/themes/amazon-web-services-2020.04.30/theme.json
    }
}
