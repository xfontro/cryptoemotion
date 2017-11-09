require 'redd'
require 'pry'
require 'json'

module CryptoEmotion
  class CryptoListService

    CRYPTO_ID_TO_NAME = {
      'eth' => 'ethereum',
      'btc' => 'bitcoin',
      'ltc' => 'litecoin',
      'neo' => 'neo'
    }.freeze

    def initialize
    end

    def read
      crypto_hash = read_crypto_list.map do |crypto_symbol, detailed_hash|
        {
          name: CRYPTO_ID_TO_NAME[crypto_symbol],
          symbol: crypto_symbol,
          sentiment_score: detailed_hash["sentiment_score"],
          fear: detailed_hash["fear"],
          anger: detailed_hash["anger"],
          disgust: detailed_hash["disgust"],
          joy: detailed_hash["joy"],
          sadness: detailed_hash["sadness"],
          keywords: detailed_hash["keywords"]
        }
      end

      crypto_hash
    end

    def update(symbol:, detailed_hash:)
      json = read_crypto_list
      clean_detailed_hash = detailed_hash.delete_if { |k, v| v.nil? }
      clean_detailed_hash.each do |key,value|
        json[symbol][key] = value
      end
      write_crypto_list(json)
      json[symbol]
    end

    private

    def read_crypto_list
      file = File.read('app/crypto-list.json')
      JSON.parse(file)
    end

    def write_crypto_list(json)
      File.open('app/crypto-list.json','w') do |f|
        f.write(json.to_json)
      end

      read_crypto_list
    end
  end
end
