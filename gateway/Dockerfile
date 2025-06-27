FROM openjdk:17
COPY ./target/gateway-0.0.1-SNAPSHOT.jar /usr/src/app/
#COPY ./opentelemetry-javaagent.jar /usr/src/app/

WORKDIR /usr/src/app
#ENV JAVA_TOOL_OPTIONS=-javaagent:/usr/src/app/opentelemetry-javaagent.jar

EXPOSE 8080
CMD ["java", "-jar", "gateway-0.0.1-SNAPSHOT.jar"]