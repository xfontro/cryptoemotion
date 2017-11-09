require 'redd'

module CryptoEmotion
  class RedditService
    def initialize(subreddit_name: 'ethereum')
      @messages = []
      @subreddit_name = subreddit_name
    end

    def call
      retrieve_subreddit_hot_messages
    end

    private

    def retrieve_subreddit_hot_messages
      client.subreddit(@subreddit_name).hot({limit: 5}).each do |hot_thread|
        hot_thread.comments.each do |c|
          if c.respond_to?(:body)
            @messages << c.body
          end
        end
      end

      @messages
    end

    def client
      @client ||= Redd.it(
        user_agent: 'Hackathon Alpha',
        client_id:  'Z_AwQflOiSKlVQ',
        secret:     'IyrqLSS611v7qhpI_cXxk2ljoho'
      )
    end
  end
end
