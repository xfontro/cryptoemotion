import json
from flask import Flask
from flask import request, jsonify

import nltk
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
#http://opensourceforu.com/2016/12/analysing-sentiments-nltk/
sid = SentimentIntensityAnalyzer()

app = Flask(__name__)
message = None

@app.route("/api/score", methods=['POST'])
def get_score():
  if not request.json or not 'message' in request.json:
    return "No data provided", 400
  else:
    message = request.json['message']
    app.logger.info(message)
    app.logger.info("***********************************************")

    ss = sid.polarity_scores(message)
    result = {}
    for k in ss:
      result["%s" % (k)] = ss[k]
      json_data = json.dumps(result)
    
    return json_data

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=9000, debug=True)
