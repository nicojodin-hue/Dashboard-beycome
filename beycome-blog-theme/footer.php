</main>
<?php
$bc_ai_prompt = 'How does Beycome work and what is their flat-fee MLS listing service? I Want to understand how Beycome can help me sell my home without paying agent commission, keep more of my equity at closing, and access the same MLS, title, and closing tools that traditional agents use.';
$bc_ai_query  = rawurlencode($bc_ai_prompt);

$bc_footer_topics = [
    'selling-a-home'   => ['Preparing Your Home' => 'preparing-your-home', 'Pricing Your Home' => 'pricing-your-home', 'Flat Fee MLS' => 'flat-fee-mls', 'FSBO Contracts' => 'fsbo-contracts', 'Selling Process' => 'selling-process', 'Handling Negotiations' => 'handling-negotiations', 'Finances of Selling' => 'finances-of-selling'],
    'buying-a-home'    => ['Buying Process' => 'buying-process', 'Finding a Home' => 'finding-a-home', 'Inspecting a Home' => 'inspecting-a-home', 'Making an Offer' => 'making-an-offer', 'Mortgage Basics' => 'mortgage-basics', 'Moving Tips' => 'moving-tips', 'Preparing to Buy' => 'preparing-to-buy', 'Where to Live' => 'where-to-live'],
    'homeowner-guides' => ['Home Improvements' => 'home-improvements', 'Landscaping' => 'landscaping', 'Lifestyle & Design' => 'lifestyle-design', 'Refinancing' => 'refinancing', 'Renting a Home' => 'renting-a-home'],
];
$bc_footer_modifiers = [
    'selling-a-home'   => 'bc-footer-topics--selling',
    'buying-a-home'    => 'bc-footer-topics--buying',
    'homeowner-guides' => 'bc-footer-topics--homeowner',
];
?>
<section class="bc-footer-topics-section">
    <div class="bc-container">
        <div class="bc-footer-topics-label">Dive into more topics</div>
        <div class="bc-footer-topics-pills">
            <?php foreach ($bc_footer_topics as $parent_slug => $subcats) :
                $modifier = $bc_footer_modifiers[$parent_slug] ?? '';
                foreach ($subcats as $label => $slug) :
                    $t = get_term_by('slug', $slug, 'category');
                    if (!$t || $t->count === 0) continue;
            ?>
            <a href="<?php echo esc_url(get_category_link($t->term_id)); ?>" class="bc-topic-sub <?php echo esc_attr($modifier); ?>"><?php echo esc_html($label); ?></a>
            <?php endforeach; endforeach; ?>
        </div>
    </div>
</section>

<style>
.bc-footer{background:#1b1b1b;color:#fff;font-size:16px;padding:80px 0 32px}
.bc-footer-inner{max-width:1280px;margin:0 auto;padding:0 16px}
.bc-footer-grid{max-width:1200px;margin:0 auto 56px;display:grid;grid-template-columns:1fr 1fr;column-gap:20px;row-gap:48px}
.bc-footer-col-title{font-size:16px;font-weight:700;letter-spacing:normal;text-transform:uppercase;color:#ffffffa6;margin-bottom:24px}
.bc-footer-col ul{list-style:none}
.bc-footer-col ul li{margin-bottom:16px}
.bc-footer-col ul li a{text-decoration:none;color:#fff;font-size:16px;font-weight:400}
.bc-footer-col ul li a:hover{opacity:.85}
.bc-footer-states{margin:32px 0 0;padding-top:24px;border-top:1px solid #ffffff1a}
.bc-footer-states-links{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:14px}
.bc-footer-states-links a{color:#ffffffa6;font-size:14px;text-decoration:none}
.bc-footer-states-links a:hover{color:#fff}
.bc-footer-btn{display:inline-flex;align-items:center;justify-content:center;flex:1 1 0;min-width:0;gap:8px;padding:10px 12px;border-radius:8px;border:1px solid #3a3a3a;background:#2a2a2a;text-decoration:none;color:#fff;transition:border-color .15s,background .15s;white-space:nowrap}
.bc-footer-btn:hover{border-color:#666;background:#333}
.bc-footer-btn-icon{flex-shrink:0;display:flex;align-items:center}
.bc-footer-btn-text{display:flex;flex-direction:column}
.bc-footer-btn-name{font-size:16px;font-weight:700;color:#fff;line-height:1.3}
.bc-footer-bar{display:flex;align-items:center;gap:20px;padding:20px 0;flex-wrap:wrap}
.bc-footer-bar-learn{font-size:14px;font-weight:400;color:#ffffffa6;white-space:nowrap}
.bc-footer-bar-socials{display:flex;gap:2px;align-items:center}
.bc-footer-bar-socials a{color:#ffffffa6;text-decoration:none;display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;transition:color .15s}
.bc-footer-bar-socials a:hover{color:#fff}
.bc-footer-bar-sep{width:1px;height:20px;background:#374151;flex-shrink:0}
.bc-footer-bar-ai{display:flex;gap:2px;align-items:center}
.bc-footer-bar-ai a,.bc-footer-bar-ai button{color:#ffffffa6;text-decoration:none;display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;transition:color .15s;background:none;border:none;cursor:pointer;padding:0}
.bc-footer-bar-ai a:hover,.bc-footer-bar-ai button:hover{color:#fff}
.bc-footer-bar-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.bc-footer-bar-ctas{display:flex;gap:10px;order:-1;width:100%;flex-wrap:nowrap}
.bc-footer-divider{margin:0 0 20px;border:none;border-top:1px solid #2a2a2a}
.bc-footer-bottom-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.bc-footer-bottom-row-address{font-size:14px;color:#ffffffa6}
.bc-footer-bottom-row-address a{color:#ffffffa6;text-decoration:none;transition:color .15s}
.bc-footer-bottom-row-address a:hover{color:#fff}
.bc-footer-bottom-row-sep{color:#374151}
.bc-footer-bottom-row-sep--wide{display:none}
.bc-footer-bottom-row-links{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:nowrap;width:100%}
.bc-footer-bottom-row-links a{font-size:12px;color:#ffffffa6;text-decoration:none;white-space:nowrap;transition:color .15s}
.bc-footer-bottom-row-links a:hover{color:#fff}
.bc-footer-legal{font-size:14px;color:#ffffffa6;line-height:1.65}
.bc-footer-legal p{margin-bottom:12px}
.bc-footer-legal a{color:#7d8ff7;text-decoration:underline}
.bc-footer-topics-pills .bc-topic-sub{text-transform:none;letter-spacing:normal;font-size:16px;font-weight:400}
.bc-footer-heart { animation: bc-heartbeat 2.4s ease-in-out infinite; transform-origin: center; width: 14px; height: 14px; }
.bc-footer-copy-sep{display:none}
@media (min-width:768px){.bc-footer-copy-sep{display:inline}}
@media (min-width:640px){
.bc-footer-bottom-row-links{justify-content:flex-start;gap:16px;flex-wrap:wrap;width:auto}
.bc-footer-bottom-row-links a{font-size:14px}
}
@media (min-width:768px){
.bc-footer-grid{grid-template-columns:repeat(4,1fr);column-gap:48px;margin-bottom:80px}
.bc-footer-btn{flex:none;min-width:180px;gap:12px;padding:10px 16px}
.bc-footer-bar-ctas{order:0;width:auto}
.bc-footer-bottom-row-sep--wide{display:inline}
}
@media (min-width:1024px){
.bc-footer-grid{max-width:1054px}
.bc-footer-bar-ctas{margin-left:auto}
}
.text-red-500 { color: oklch(63.7% .237 25.331); }
@keyframes bc-heartbeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.25); }
    28% { transform: scale(1); }
    42% { transform: scale(1.18); }
    56% { transform: scale(1); }
}
</style>
<footer class="bc-footer">
<div class="bc-footer-inner">
    <div class="bc-footer-grid">
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Features</div>
            <ul>
                <li><a href="https://www.beycome.com/flat-fee-mls">Sell my home</a></li>
                <li><a href="https://www.beycome.com/i-want-to-buy-a-home">Buy a home</a></li>
                <li><a href="https://www.beycometitle.com/" target="_blank" rel="noopener noreferrer">Title</a></li>
                <li><a href="https://www.beycome.com/military-fsbo">Military</a></li>
                <li><a href="https://www.beycome.com/properties-closed">Closed homes</a></li>
            </ul>
        </div>
		<div class="bc-footer-col">
            <div class="bc-footer-col-title">Company</div>
            <ul>
                <li><a href="https://www.beycome.com/about-us">About us</a></li>
                <li><a href="https://www.beycome.com/reviews">Reviews</a></li>
                <li><a href="https://www.beycome.com/media-press-inquiries">Press</a></li>
                <li><a href="https://www.beycome.com/technology">Technology</a></li>
                <li><a href="https://investor.beycome.com/" target="_blank" rel="noopener noreferrer">Investors</a></li>
            </ul>
        </div>
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Resources</div>
            <ul>
                <li><a href="<?php echo esc_url(untrailingslashit(home_url('/'))); ?>">Blog</a></li>
                <li><a href="https://www.beycome.com/faq/">FAQ</a></li>
                <li><a href="https://www.beycome.com/how-it-works">How it works</a></li>
                <li><a href="https://www.beycome.com/real-estate-glossary">Real estate glossary</a></li>
            </ul>
        </div>
        <div class="bc-footer-col">
            <div class="bc-footer-col-title">Tools</div>
            <ul>
                <li><a href="https://www.beycome.com/how-much-is-my-home-worth">Property price estimator</a></li>
                <li><a href="https://www.beycome.com/blog/real-estate-commission-by-state-2026/">Commission by state</a></li>
                <li><a href="https://www.beycome.com/calculators">Real estate calculators</a></li>
            </ul>
        </div>
    </div>


    <div class="bc-footer-states">
        <div class="bc-footer-col-title">Flat fee MLS by state</div>
        <div class="bc-footer-states-links">
            <a href="https://www.beycome.com/flat-fee-mls/alabama">Alabama</a>
            <a href="https://www.beycome.com/flat-fee-mls/california">California</a>
            <a href="https://www.beycome.com/flat-fee-mls/connecticut">Connecticut</a>
            <a href="https://www.beycome.com/flat-fee-mls/washington-dc">Washington DC</a>
            <a href="https://www.beycome.com/flat-fee-mls/florida">Florida</a>
            <a href="https://www.beycome.com/flat-fee-mls/georgia">Georgia</a>
            <a href="https://www.beycome.com/flat-fee-mls/illinois">Illinois</a>
            <a href="https://www.beycome.com/flat-fee-mls/indiana">Indiana</a>
            <a href="https://www.beycome.com/flat-fee-mls/maryland">Maryland</a>
            <a href="https://www.beycome.com/flat-fee-mls/michigan">Michigan</a>
            <a href="https://www.beycome.com/flat-fee-mls/minnesota">Minnesota</a>
            <a href="https://www.beycome.com/flat-fee-mls/north-carolina">North Carolina</a>
            <a href="https://www.beycome.com/flat-fee-mls/ohio">Ohio</a>
            <a href="https://www.beycome.com/flat-fee-mls/pennsylvania">Pennsylvania</a>
            <a href="https://www.beycome.com/flat-fee-mls/south-carolina">South Carolina</a>
            <a href="https://www.beycome.com/flat-fee-mls/tennessee">Tennessee</a>
            <a href="https://www.beycome.com/flat-fee-mls/texas">Texas</a>
            <a href="https://www.beycome.com/flat-fee-mls/virginia">Virginia</a>
        </div>
    </div>

    <div class="bc-footer-bar">
        <span class="bc-footer-bar-learn">Learn more</span>
        <div class="bc-footer-bar-socials">
            <a href="https://www.facebook.com/beycomeUSA/" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on Facebook">
                <?php echo beycome_blog_icon('facebook', 19); ?>
                <span class="bc-footer-bar-sr">Beycome on Facebook</span>
            </a>
            <a href="https://x.com/beycome" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on X">
                <?php echo beycome_blog_icon('x', 19); ?>
                <span class="bc-footer-bar-sr">Beycome on X</span>
            </a>
            <a href="https://www.instagram.com/beycome/" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on Instagram">
                <?php echo beycome_blog_icon('instagram', 19); ?>
                <span class="bc-footer-bar-sr">Beycome on Instagram</span>
            </a>
            <a href="https://linkedin.com/company/beycome" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on LinkedIn">
                <?php echo beycome_blog_icon('linkedin', 19); ?>
                <span class="bc-footer-bar-sr">Beycome on LinkedIn</span>
            </a>
            <a href="https://www.zillow.com/profile/gobeycome/" target="_blank" rel="noopener nofollow noreferrer" aria-label="Beycome on Zillow">
                <?php echo beycome_blog_icon('zillow', 19); ?>
                <span class="bc-footer-bar-sr">Beycome on Zillow</span>
            </a>
        </div>

        <div class="bc-footer-bar-sep"></div>

        <div class="bc-footer-bar-ai">
            <a href="https://chat.openai.com/?q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask ChatGPT about Beycome">
                <?php echo beycome_blog_icon('chatgpt', 20); ?>
                <span class="bc-footer-bar-sr">Ask ChatGPT about Beycome</span>
            </a>
            <a href="https://claude.ai/new?q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Claude about Beycome">
                <?php echo beycome_blog_icon('claude', 20); ?>
                <span class="bc-footer-bar-sr">Ask Claude about Beycome</span>
            </a>
            <a href="https://www.google.com/search?udm=50&aep=11&q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Gemini about Beycome">
                <?php echo beycome_blog_icon('gemini', 20); ?>
                <span class="bc-footer-bar-sr">Ask Gemini about Beycome</span>
            </a>
            <a href="https://x.com/i/grok?text=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Grok about Beycome">
                <?php echo beycome_blog_icon('grok', 20); ?>
                <span class="bc-footer-bar-sr">Ask Grok about Beycome</span>
            </a>
            <a href="https://www.perplexity.ai/?q=<?php echo $bc_ai_query; ?>" target="_blank" rel="noopener nofollow noreferrer" aria-label="Ask Perplexity about Beycome">
                <?php echo beycome_blog_icon('perplexity', 20); ?>
                <span class="bc-footer-bar-sr">Ask Perplexity about Beycome</span>
            </a>
        </div>

        <div class="bc-footer-bar-ctas">
            <a href="https://www.beycome.com/book" class="bc-footer-btn">
                <span class="bc-footer-btn-icon"><?php echo beycome_blog_icon('calendar-solid', 22); ?></span>
                <span class="bc-footer-btn-text">
                    <span class="bc-footer-btn-name">Schedule a call</span>
                </span>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=18046565007" target="_blank" rel="noopener noreferrer" class="bc-footer-btn">
                <span class="bc-footer-btn-icon"><?php echo beycome_blog_icon('whatsapp', 22); ?></span>
                <span class="bc-footer-btn-text">
                    <span class="bc-footer-btn-name">WhatsApp</span>
                </span>
            </a>
        </div>
    </div>

    <hr class="bc-footer-divider">

    <div class="bc-footer-bottom-row">
        <span class="bc-footer-bottom-row-address">Beycome Corp., 7900 SW 57th Avenue, Suite 23, Miami, FL 33143</span>
        <span class="bc-footer-bottom-row-sep bc-footer-bottom-row-sep--wide">|</span>
        <div class="bc-footer-bottom-row-links">
            <a href="https://www.beycome.com/terms-and-conditions">Terms &amp; conditions</a>
            <a href="https://www.beycome.com/privacy-policy">Privacy policy</a>
            <a href="https://www.beycome.com/dmca">DMCA</a>
            <a href="https://www.beycome.com/accessibility">Accessibility</a>
        </div>
    </div>

    <div class="bc-footer-legal">
        <p><strong>Agreement to terms and privacy policy:</strong> By using beycome.com, you agree to our <a href="https://www.beycome.com/terms-and-conditions">Terms and conditions</a> and our <a href="https://www.beycome.com/privacy-policy">Privacy policy</a>.</p>
        <p><strong>Technology platform — not a brokerage:</strong> Beycome Corp. is a software technology company and does not provide real estate brokerage, mortgage lending, or title insurance services. Beycome Corp. is not a licensed real estate broker, mortgage lender, or title insurer, and nothing on this platform constitutes real estate, legal, financial, or investment advice. The beycome.com platform connects consumers with independently operated licensed entities and third-party service providers. Beycome Corp. expressly disclaims any liability arising from real estate transactions, brokerage activities, loan origination, or title services conducted by any affiliated or third-party company.</p>
        <p><strong>Affiliated licensed entities (separate legal entities):</strong> Beycome Corp.&rsquo;s affiliated companies share common ownership but are separate legal entities. Each operates under its own licensed management, as required by applicable law, and is solely responsible for its licensed activities. Real estate brokerage services are provided by Beycome of Florida LLC in FL; Beycome Brokerage Realty Inc. in CA (CalDRE #02247733); in CT by Beycome of Connecticut, a DBA of the licensed Connecticut broker; and Beycome Brokerage Realty LLC in AL, DC, GA, IL, IN, MD, MI, MN, NC, NY, OH, PA, SC, TN, TX, and VA. Homes are listed in 17 states and DC (New York not yet). Mortgage loan origination services in Florida are provided by Beycome Mortgage LLC. Title insurance services are provided by Beycome Title of Florida LLC in Florida, Beycome Title of Texas LLC in Texas, and Beycome Title LLC in Michigan, Ohio, Illinois and Indiana. TREC: <a href="https://www.beycome.com/legal/IABS-12.pdf" rel="noreferrer noopener" target="_blank">Information About Brokerage Services</a> | <a href="https://www.trec.texas.gov/forms/consumer-protection-notice" rel="noreferrer noopener" target="_blank">Consumer Protection Notice</a>.</p>
        <p><strong>Legal disclaimer:</strong> Information is current as of October 2026. Beycome Corp. may modify or discontinue products and benefits without notice. No guarantee, warranty, or representation of any kind is made regarding the completeness or accuracy of descriptions or measurements (including square footage and property condition); such should be independently verified, and Beycome Corp. expressly disclaims any liability in connection therewith.</p>
        <p><strong>Trademark notice:</strong> Logos and trademarks on this website are used to illustrate industry partnerships and do not imply endorsement unless explicitly stated. All trademarks belong to their respective owners.</p>
        <p>IDX&copy; information is provided exclusively for consumers' personal, non-commercial use. It may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Information deemed reliable but not guaranteed to be accurate. Listings information is updated daily. Broker Compensation is fully negotiable and is not fixed, controlled, recommended, or suggested by any MLS or association of REALTORS&reg;. Beycome fully supports the <a href="https://www.hud.gov" rel="noreferrer noopener" target="_blank">Equal Housing Opportunity</a> laws.</p>
		<p>All rights reserved, Copyright ©<?php echo date('Y') ?> beycome&trade; <span class="bc-footer-copy-sep">·</span> Made with <?php echo beycome_blog_icon('heart', 0, 0, 'bc-footer-heart h-3.5 w-3.5 flex-none text-red-500'); ?> 
            in the USA for the people. 
		</p>
    </div>
</div>
</footer>

<?php /* Header-search + mobile-menu JS is enqueued via assets/blog.js
       in functions.php. We used to also include it as an inline <script>
       here, which caused WP Fastest Cache to attach two copies of every
       click listener — every other click toggled state back to nothing.
       Single source now. */ ?>
<?php wp_footer(); ?>
</body>
</html>
