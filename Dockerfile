# Use official OpenJDK image
FROM openjdk:17-jdk

# Set working directory
WORKDIR /app

# Copy the Maven project
COPY . .

# Build the Spring Boot application
RUN ./mvnw clean install -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "target/*.jar"]
