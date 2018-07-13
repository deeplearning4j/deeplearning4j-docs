---
title: User Guide
short_title: Guide
description: In-depth documentation for Eclipse Deeplearning4j including import, distributed training, early stopping, and GPU setup.
layout: default
---

{% assign groups = site.v10-guide | group_by: "category" | sort_by: "name" %}

<div class="row">
	{% for group in groups %}

	{% assign pages = group.items | sort: "weight"  %}

	{% if group.name != "" %}
	<div class="col-md-4">
	    <div class="card">
	        <h4 class="card-header">
	            {{ group.name }}
	        </h4>
	        <ul class="list-group list-group-flush">
	        {% for item in pages %}
		        <li class="list-group-item"><a href="{{item.url}}">{{item.short_title}}</a></li>
		    {%endfor%}
	        </ul>
	    </div>
	</div>
	{% endif %}
	{%endfor%}
</div>