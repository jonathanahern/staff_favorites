# frozen_string_literal: true
module ShopifyApp
  class AuthenticatedController < ActionController::Base
    include ShopifyApp::Authenticated

    protect_from_forgery with: :exception

    before_action :set_shop

    private
    def set_shop
      if @shop.nil?
        @shop = Shop.first;
      end
    end
  end
end
