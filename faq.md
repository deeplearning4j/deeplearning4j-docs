---
title: Frequently Asked Questions
short_title: FAQ
description: Commonly asked questions about Eclipse Deeplearning4j, deep learning, and artificial intelligence.
layout: default
---

<div class="row">
	<div class="col-md-2"></div>
		<div class="col-md-8 mb40">
		 <div id="accordion" class="mb70" role="tablist" aria-multiselectable="true">

			<div class="card mb10">
					<div class="card-header accordion-header" role="tab" id="q1">
							<h5 class="mb-0">
									<a data-toggle="collapse" data-parent="#accordion" href="#a1" aria-expanded="false" aria-controls="a1">
											Why Deeplearning4j?
									</a>
							</h5>
					</div>
					<div id="a1" class="collapse in" role="tabpanel" aria-labelledby="q1">
							<div class="card-body">
									With a versatile n-dimensional array class for Java and Scala, DL4J is Scalable on Hadoop, utlizes GPU support for scaling on AWS, includes a general vectorization tool for machine-learning libs, and most of all relies on ND4J: A matrix library much faster than Numpy and largely written in C++. We also built RL4J: Reinforcement Learning for Java with Deep Q learning and A3C.
							</div>
					</div>
			</div>

			<div class="card mb10">
					<div class="card-header accordion-header" role="tab" id="q2">
							<h5 class="mb-0">
									<a data-toggle="collapse" data-parent="#accordion" href="#a2" aria-expanded="false" aria-controls="a2">
											What's the use case for AI and machine learning?
									</a>
							</h5>
					</div>
					<div id="a2" class="collapse in" role="tabpanel" aria-labelledby="q2">
							<div class="card-body">
									AI tools like Deeplearning4j can be applied to robotic process automation (RPA), Fraud detection, network intrusion detection, Recommender Systems (CRM, adtech, churn prevention), Regression and predictive analytics, Face/image recognition, Voice search, Speech-to-text (transcription), and preventative hardware monitoring (anomaly detection).
							</div>
					</div>
			</div>

			<div class="card mb10">
					<div class="card-header accordion-header" role="tab" id="q3">
							<h5 class="mb-0">
									<a data-toggle="collapse" data-parent="#accordion" href="#a3" aria-expanded="false" aria-controls="a3">
											How can I contribute?
									</a>
							</h5>
					</div>
					<div id="a3" class="collapse in" role="tabpanel" aria-labelledby="q3">
							<div class="card-body">
									Developers who would like to contribute to Deeplearning4j can get started by reading our <a href="/contribute">Contribtor's Guide</a>.
							</div>
					</div>
			</div>

			<div class="card mb10">
					<div class="card-header accordion-header" role="tab" id="q4">
							<h5 class="mb-0">
									<a data-toggle="collapse" data-parent="#accordion" href="#a4 " aria-expanded="false" aria-controls="a4">
											Is DL4J parallelized and multi-threaded?
									</a>
							</h5>
					</div>
					<div id="a4" class="collapse in" role="tabpanel" aria-labelledby="q4">
							<div class="card-body">
									Deeplearning4j includes both a distributed, multi-threaded deep-learning framework and a normal single-threaded deep-learning framework. Training takes place in the cluster, which means it can process massive amounts of data quickly. Nets are trained in parallel via iterative reduce, and they are equally compatible with Java, Scala, Clojure and Kotlin. Deeplearning4j's role as a modular component in an open stack makes it the first deep-learning framework adapted for a micro-service architecture.
							</div>
					</div>
			</div>

			</div>
		</div>
	<div class="col-md-2"></div>
</div>
