# nlp_script.py
import sys
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from nltk.tokenize.treebank import TreebankWordDetokenizer
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

# pip install nltk
# pip install numpy
# pip install sumy
# if error is there look at the error and download the package

# uncomment them and run the .py file all of packages will get downloaded.
# nltk.download("punkt")
# nltk.download("stopwords")
# nltk.download("vader_lexicon")
# nltk.download("maxent_ne_chunker")
# nltk.download("words")


def tokenize(text):
    return word_tokenize(text)

def extract_keywords(tokens):
    stop_words = set(stopwords.words("english"))
    return [word for word in tokens if word.lower() not in stop_words]

def analyze_sentiment(text):
    sid = SentimentIntensityAnalyzer()
    sentiment_scores = sid.polarity_scores(text)
    # return "Positive" if sentiment_scores["compound"] >= 0 else "Negative"
    scores = {
        "positive": sentiment_scores['pos'],
        "negative": sentiment_scores['neg'],
        "scary": custom_sentiment_score(text, ["scary", "fear", "horror"]),
        "sad": custom_sentiment_score(text, ["sad", "unhappy", "tearful"]),
        "joyful": custom_sentiment_score(text, ["joyful", "happy", "ecstatic"])
    }

    # print(scores)
    # Determine the final sentiment based on the highest score
    final_sentiment = max(scores, key=scores.get)

    return final_sentiment
    
def custom_sentiment_score(text, keywords):
    lower_text = text.lower()
    count = sum(lower_text.count(keyword) for keyword in keywords)
    return count / len(text.split())  # Normalising by the number of words

def categorize_note(keywords, sentiment):
    # I am categorizng logic based on keywords and sentiment
    return "Personal" if sentiment == "Positive" else "Work"

def extract_named_entities(text):
    tokens = word_tokenize(text)
    pos_tags = pos_tag(tokens)
    named_entities = ne_chunk(pos_tags)
    return named_entities

def extract_summary(text, num_sentences=3):
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, num_sentences)
    return [str(sentence) for sentence in summary]

try:
    input_data = sys.argv[1]
    # input_data = "Hello World!!"
    text = input_data

    # Tokenization
    tokens = tokenize(text)

    # Keyword Extraction
    keywords = extract_keywords(tokens)
    # print("Keywords:", keywords)

    # Sentiment Analysis
    sentiment = analyze_sentiment(text)
    print("Sentiment:", sentiment)

    # Categorize Note
    category = categorize_note(keywords, sentiment)
    print("Category:", category)

    # Named Entity Recognition
    named_entities = extract_named_entities(text)
    # print("Named Entities:", named_entities)

    # Extract Summary
    summary_sentences = extract_summary(text)
    print("Summary:", TreebankWordDetokenizer().detokenize(summary_sentences))

except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
