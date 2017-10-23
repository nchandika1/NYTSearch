$(document).ready(function(){

	function searchButtonClick(event) {
		event.preventDefault();
		$("#well-section").empty();
		var searchTerm = $("#search-term").val().trim();
		var numRecords = $("#num-records").val().trim();
		var startYear = $("#start-year").val().trim();
		var endYear = $("#end-year").val().trim();
		console.log(searchTerm, numRecords, startYear, endYear);

		// NYT API KEY: 84afad745f424c2a9fa2f4e7ea4b4a5e
		// NYT API returns 10 results by default and other then "page" option there is no specific option for num records

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=84afad745f424c2a9fa2f4e7ea4b4a5e&q=";
		queryURL += searchTerm;

		if (startYear != "") {
			startYear = startYear + "0101";
			queryURL += "&begin_date=" + startYear;

		}
		if (endYear != "") {
			endYear = endYear + "0101";
			queryURL += "&end_date=" + endYear;
		}	

		console.log(queryURL);

		$.ajax({url: queryURL, method: "GET"}).done(function(result){

			if (numRecords == "") {
				return;
			}

			if (result.response.docs.length < numRecords) {
				numRecords = result.response.docs.length;
			}

			console.log(result.response.docs.length);

			for (var i=0; i<numRecords; i++) {
				var headLine = result.response.docs[i].headline.main;
				var byLine = result.response.docs[i].byline.original;
				var pubDate = result.response.docs[i].pub_date;
				var snippet = result.response.docs[i].snippet
				
				var articleDiv = $("<div>");
				var heading = $("<h3>");
				heading.html(headLine);
				var pbyLine = $("<p>");
				pbyLine.html(byLine);
				var ppubDate = $("<p>");
				ppubDate.html(pubDate);
				var pSnippet = $("<p>");
				pSnippet.html(snippet);

				articleDiv.append(heading);
				articleDiv.append(pbyLine);
				articleDiv.append(ppubDate);
				articleDiv.append(pSnippet);

				$("#well-section").append(articleDiv);
			}
		});
	}

	function clearButtonClick(event) {
		$("#search-term").val("");
		$("#num-records").val("1");
		$("#start-year").val("");
		$("#end-year").val("");
	}

	//Click function for Search Button
	$("#run-search").on("click", searchButtonClick);
	//Click function for Clear Button
	$("#clear-all").on("click", clearButtonClick);
});

