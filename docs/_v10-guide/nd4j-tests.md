---
title: Running Tests
short_title: Testing
description: How to run tests for ND4J
category: ND4J
weight: 10
---

## About ND4J tests

In nd4j, running tests can be a bit difficult to understand due to the multi backend nature of nd4j.

Nd4j has a singlar test directory for all backends:
https://github.com/deeplearning4j/nd4j/tree/master/nd4j-backends/nd4j-tests

This is where all tests go.

All tests must extend [BaseNd4jTest](https://github.com/deeplearning4j/nd4j/blob/master/nd4j-backends/nd4j-tests/src/test/java/org/nd4j/linalg/BaseNd4jTest.java) and have the parameterized runner specified. See(LoneTest)[https://github.com/deeplearning4j/nd4j/blob/master/nd4j-backends/nd4j-tests/src/test/java/org/nd4j/linalg/LoneTest.java)
for an example.

When extending BaseNd4jTest, an ordering method returning 'c' or 'f' must also be specified.

-Running a single class

-Maven

cd in to the backend of your choice. Backends are located under [nd4j-backend-impls](https://github.com/deeplearning4j/nd4j/tree/master/nd4j-backends/nd4j-backend-impls)
and run
```
mvn clean test -Dtest=ClassName
```
If you want to run a single method:
```
mvn clean test -Dtest=ClassName#methodName
```
-Intellij

Go to the method name of your test you want to run. Right click and hit run.
It should give you an error regarding filters and requests. Ignore that error.

Go to Run -> Edit Configurations

Find ClassName.methodName (whatever the name of your test class/method name are)

Look for: Use classpath of module.

Switch the module to be the backend you want to use.

Keep in mind that everytime you change the tests, in order for intellij to update, you need to run mvn clean install on the whole project
right now. This will allow you to run/debug tests for different backends though.

Ignore the warning in the corner about it not finding the folder. The classpath is resolved via maven and will pick up the test
when you run it.