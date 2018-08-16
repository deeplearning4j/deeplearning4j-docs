#!/usr/bin/env bash

################################################################################
# Copyright (c) 2015-2018 Skymind, Inc.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
################################################################################

# Make sure to set $DL4J_TUTORIALS_DIR to your local copy of tutorial notebooks
LANG="en_US.UTF-8"
SOURCE_DIR=$(pwd)
DEST_DIR="../docs/_tutorials"

rm -rf "$DEST_DIR"
mkdir "$DEST_DIR"

if [[ -z "${DL4J_TUTORIALS_DIR}" ]]; then
	echo WARNING: DL4J_TUTORIALS_DIR env variable is not set!
	exit 1
else
	find $DL4J_TUTORIALS_DIR/ -iname '*.ipynb' -type f | while read fullfile; do
		fname=$(basename -- "$fullfile")
		fname="${fname%.*}"
		jsonname="${fname//.zepp/}"
		jsonname="${jsonname// /%20}"
		jsonname=$(echo "$jsonname.json")
		fname="${fname//[\.]}"
		fname="${fname//zepp}"
		fname="${fname//  / }"
		title="${fname//[0-9]}"
		fname="${fname// /-}"
		fname="${fname//--/-}"
		fname=$(echo "$fname" | tr '[:upper:]' '[:lower:]')
		destfile="$DEST_DIR/$fname.md"
		output=$(notedown "$fullfile" --to markdown)
		{
			printf "%s\n" "---"
			printf "%s\n" "title: ${title}"
			printf "%s\n" "short_title: ${title}"
			printf "%s\n" "description: Deep learning tutorial using Eclipse Deeplearning4j for ${title}"
			printf "%s\n" "category: Tutorials"
			printf "%s\n" "json_link: $jsonname"
			printf "%s\n\n" "---"
			printf "%s\n" "${output}"
		} > tmp && mv tmp "$destfile"
		dos2unix "$destfile"
		sed -i '' -e 's/{\.python.*}/java/g' "$destfile"
	done;
	cp tutorials-setup.md $DEST_DIR/setup.md
fi
