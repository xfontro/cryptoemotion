require 'redd'
require 'pry'
require 'json'

module CryptoEmotion
  class CryptoListService
    def initialize
    end

    def read
      crypto_hash = read_crypto_list.map do |crypto_symbol, detailed_hash|
        {
          name: ::CryptoEmotion::CoinConstants.for(symbol: crypto_symbol)[:name],
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

    def update(symbol:, name:, detailed_hash:)
      json = read_crypto_list
      clean_detailed_hash = detailed_hash.delete_if { |k, v| v.nil? }
      clean_detailed_hash.each do |key,value|
        if json[symbol].nil?
          json[symbol] = {'name'=> name,'symbol'=> symbol}
        end
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
