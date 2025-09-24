import React from "react";

export default function Footer({ className = "", withCopyrightYear = new Date().getFullYear() }) {
  return (
    <footer id="footer" className={`bg-gray-50 mt-20 text-gray-800 border-t border-t-gray-300 ${className}`} aria-labelledby="footer-heading">
      <div className=" max-w-[1360px] lg:px-0 px-3 md:px-3  mx-auto">
        <div className="pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Contact column */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Contact</h5>
              <div className="space-y-2 text-sm">
                <p className="leading-5">16516 / 88096780016656</p>
                <p className="leading-5">
                  <a href="mailto:info@sheba.xyz" className="hover:underline">info@fixify.xyz</a>
                </p>
                <p className="mt-3 text-xs font-medium">Corporate Address</p>
                <address className="not-italic text-sm leading-5">
                  M&amp;S Tower, Plot: 2, Road: 11,<br />
                  Block: H, Banani, Dhaka
                </address>

                <h6 className="mt-4 text-sm font-semibold">Trade License No</h6>
                <p className="text-xs">TRAD/DNCC/145647/2022</p>
              </div>
            </div>

            {/* Other pages column */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Other Pages</h5>
              <nav aria-label="Other pages" className="text-sm space-y-2">
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Blog</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Help</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Terms of use</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Privacy Policy</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Refund &amp; Return Policy</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Sitemap</a></p>
              </nav>
            </div>

            {/* Company column */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Company</h5>
              <nav aria-label="Company links" className="text-sm space-y-2">
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Manager</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Business</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Delivery</a></p>
                <p><a href="" target="_blank" rel="noreferrer" className="hover:underline">Bondhu</a></p>
              </nav>
            </div>

            {/* Download & Social column */}
            <div className="flex flex-col justify-between">
              <div>
                <h5 className="text-lg font-semibold mb-3">Download Our App</h5>
                <p className="text-sm mb-4">Tackle your to-do list wherever you are with our mobile app &amp; make your life easy.</p>

                <div className="flex items-center gap-3 mb-4">
                  <a id="app-store" role="button" target="_blank" rel="noreferrer" href="https://itunes.apple.com/us/app/sheba-xyz/id1399019504" className="inline-block">
                    <img src="https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/sheba_xyz/app-store.png" alt="app store" className="h-10 w-auto rounded" />
                  </a>
                  <a role="button" target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=xyz.sheba.customersapp&amp;hl=en" className="inline-block">
                    <img src="https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/sheba_xyz/play-store.png" alt="google play" className="h-10 w-auto rounded" />
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <a role="button" target="_blank" rel="noreferrer" href="https://www.facebook.com/" aria-label="Sheba Facebook" className="inline-flex items-center">
                    <img src="https://cdn-marketplacedev.s3.ap-south-1.amazonaws.com/social/facebook.svg" alt="Sheba.xyz Facebook" className="h-6 w-6" />
                  </a>
                  <a role="button" target="_blank" rel="noreferrer" href="linkedin.com/" aria-label="Sheba LinkedIn" className="inline-flex items-center">
                    <img src="https://cdn-marketplacedev.s3.ap-south-1.amazonaws.com/social/linkedin.svg" alt="Sheba.xyz Linkedin" className="h-6 w-6" />
                  </a>
                  <a role="button" target="_blank" rel="noreferrer" href="https://www.instagram.com/?hl=en" aria-label="Sheba Instagram" className="inline-flex items-center">
                    <img src="https://cdn-marketplacedev.s3.ap-south-1.amazonaws.com/social/instagram.svg" alt="Sheba.xyz Instagram" className="h-6 w-6" />
                  </a>
                </div>
              </div>

              
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Footer copyright bottom only */}
          <div className="pb-6 flex justify-center">
            <p className="text-sm text-gray-600">
              Copyright <span aria-hidden>©</span> {withCopyrightYear}{" "}
              <a role="button" target="_blank" rel="noreferrer" className="hover:underline font-medium">
                Fixify Platform Limited
              </a>{" "}
              | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
