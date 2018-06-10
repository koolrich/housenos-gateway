package com.housenos.housenosgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
public class HousenosGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(HousenosGatewayApplication.class, args);
	}
}
