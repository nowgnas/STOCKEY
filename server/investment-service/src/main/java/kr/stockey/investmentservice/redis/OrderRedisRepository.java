package kr.stockey.investmentservice.redis;

import org.springframework.data.repository.CrudRepository;

public interface OrderRedisRepository extends CrudRepository<Order, String> {
}
