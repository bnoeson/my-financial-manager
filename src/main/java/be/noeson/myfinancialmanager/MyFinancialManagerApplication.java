package be.noeson.myfinancialmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableAsync
@Configuration
public class MyFinancialManagerApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(MyFinancialManagerApplication.class, args);
	}

}
