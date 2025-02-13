# Use OpenJDK runtime
FROM openjdk:23-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy only the project folder (if needed)
COPY /server/expensetracking /app

# Move to the correct directory
WORKDIR /app

# Give execution permission to mvnw
RUN chmod +x mvnw

# Build the Spring Boot application
RUN ./mvnw clean install -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/*.jar"]
