#!/usr/bin/env bash                                                             
#                                                                               
# FIXME:Finds ignored test classes, test methods and failing tests set to ignore 
# in given project directory. 
#                                                                               
# Author        :Susan Eraly
# Email         :susan@skymind.global
#     
# Globals:                                                                    
# FIXME

# Note: 
# FIXME
###############################################################################

set -o errexit
set -o pipefail

usage=\
'
Usage is:
  check-links.sh <Path for results> [Docs version]
  
  Example usage:
  ./check-links.sh docs_cleanup
  ./check-links.sh docs_cleanup 100-beta2

  Required arguments in <>
  Optional arguments in []
'

BASE_URL="https://deeplearning4j.oss.konduit.ai" 


###############################################################################
#Prints filename,status,url
###############################################################################
check_links() {
    echo -e "\nRunning checks on markdown in $DOCS_DIR"
	md_files=$(find $1 -type f -name "*.md")
    for md_file in ${md_files[@]}; do
        if grep -q "category:" $md_file; then
		    url_category_part=$(grep "category:" $md_file | \
    	                      awk -F ":" '{print tolower($2)}' | \
    	                      perl -pe 'chomp;s/^\s+|\s+$//;s/&/and/g;s/\s+/-/g')
    	    url_file_part=$(basename $md_file | \
		    				perl -pe 's/(arbiter|datavec|deeplearning4j-nlp|deeplearning4j-nn|deeplearning4j-scaleout|deeplearning4j-zoo|deeplearning4j|keras-import|nd4j-nn|nd4j|samediff|scalnet)-//;s/\.md//')
            url_is="$BASE_URL"
            if [[ ! $url_category_part =~ get-started ]] && [[ ! $url_category_part =~ configuration ]]; then
		   	    url_is="$url_is"/"$url_category_part"
            fi
		   	url_is="$url_is"/"$url_file_part"
            if wget --max-redirect=0 --spider $url_is 2>/dev/null; then
  				echo $PWD/../$md_file,200,$url_is
			else
  				echo $PWD/../$md_file,404,$url_is
			fi
         fi
    done 
}
###############################################################################

if [[ "$#" -lt 1 ]]; then
  echo "ERROR: Illegal number of arguments." 1>&2
  echo "$usage" 1>&2
  echo "Exiting script..." 1>&2
  exit 77
fi

RESULTS_DIR=$1
rm -rf "$RESULTS_DIR"
mkdir -p "$RESULTS_DIR"

docs_base_dir="$(dirname $0)/"../docs
if [[ "$#" -eq 2 ]]; then
	version==$1
else
	version=latest
fi
DOCS_DIR="$docs_base_dir"/_"$version"
TUTORIAL_DIR="$docs_base_dir"/_tutorials

## Process docs/_latest first
docs_status_file=$RESULTS_DIR/docs.$version.txt
check_links $DOCS_DIR 2>&1 | tee $docs_status_file
echo "Output written to $docs_status_file"

# Process tutorial
tutorial_status_file=$RESULTS_DIR/tutorial.txt 
check_links $TUTORIAL_DIR 2>&1 | tee  $tutorial_status_file
echo "Outputs written to $tutorial_status_file"

docs_dead_count=$(grep -c 404 $docs_status_file) || true
docs_not_dead_count=$(grep -c 200 $docs_status_file) || true

tutorial_dead_count=$(grep -c 404 $tutorial_status_file) || true
tutorial_not_dead_count=$(grep -c 200 $tutorial_status_file) || true

echo -e "\n\tSummary"
echo -e "\tDocs, $docs_status_file: $docs_not_dead_count 200's, $docs_dead_count 404's"
echo -e "\tTutorial, $tutorial_status_file: $tutorial_not_dead_count 200's, $tutorial_dead_count 404's"
