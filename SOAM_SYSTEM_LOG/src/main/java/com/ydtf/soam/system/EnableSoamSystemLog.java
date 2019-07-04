package com.ydtf.soam.system;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
//@ComponentScan
//@Import({FeignScanRunner.class,LogRunner.class,SystemRunner.class})
public @interface EnableSoamSystemLog {

}