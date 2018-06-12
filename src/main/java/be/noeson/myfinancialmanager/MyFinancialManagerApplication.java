package be.noeson.myfinancialmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MyFinancialManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyFinancialManagerApplication.class, args);
	}
}
