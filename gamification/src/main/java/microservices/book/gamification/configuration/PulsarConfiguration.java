package microservices.book.gamification.configuration;

import microservices.book.event.challenge.ChallengeSolvedEvent;
import org.apache.pulsar.client.api.Schema;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.pulsar.core.DefaultSchemaResolver;
import org.springframework.pulsar.core.PulsarTopic;
import org.springframework.pulsar.core.PulsarTopicBuilder;
import org.springframework.pulsar.core.SchemaResolver;

@Configuration
public class PulsarConfiguration {

    /**
     * this config which is the same as multiplication is to avoid the pulsar listener creating non-partitioned topic automatically.
     * @param topicName
     * @param partitions
     * @param topicBuilder
     * @return
     */
    @Bean
    public PulsarTopic partitionedTopic(@Value("${pulsar.attempts.topic}") final String topicName,
                                        @Value("${pulsar.attempts.partitions}") Integer partitions, PulsarTopicBuilder topicBuilder){
        return topicBuilder.name(topicName).numberOfPartitions(partitions).build();
    }
}