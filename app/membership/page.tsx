import Layout from "@/components/Layout";
import MembershipTiers from "@/components/storyblok/MembershipTiers";
import MembershipBenefits from "@/components/storyblok/MembershipBenefits";

export default function MembershipPage() {
    const membershipTiersData = {
        _uid: "membership-tiers-1",
        component: "membership_tiers",
        title: "Choose Your Plan",
        tiers: [
            {
                _uid: "tier-basic",
                name: "Basic",
                price: "9.99",
                period: "month",
                features: "Access to exclusive content\n10% discount on products\nMonthly newsletter\nCommunity access",
                cta_text: "Get Started",
                cta_url: "/register?plan=basic",
                featured: false
            },
            {
                _uid: "tier-premium",
                name: "Premium",
                price: "19.99",
                period: "month",
                features: "All Basic features\n20% discount on products\nPriority support\nEarly access to new products\nExclusive events",
                cta_text: "Go Premium",
                cta_url: "/register?plan=premium",
                featured: true
            },
            {
                _uid: "tier-vip",
                name: "VIP",
                price: "49.99",
                period: "month",
                features: "All Premium features\n30% discount on products\nPersonal beauty consultant\nFree shipping\nVIP events and workshops\nCustom product recommendations",
                cta_text: "Become VIP",
                cta_url: "/register?plan=vip",
                featured: false
            }
        ]
    };

    const membershipBenefitsData = {
        _uid: "membership-benefits-1",
        component: "membership_benefits",
        title: "Member Benefits",
        benefits: [
            {
                _uid: "benefit-1",
                icon: "star",
                title: "Exclusive Products",
                description: "Access to limited edition and member-only products"
            },
            {
                _uid: "benefit-2",
                icon: "discount",
                title: "Special Discounts",
                description: "Save on every purchase with member pricing"
            },
            {
                _uid: "benefit-3",
                icon: "community",
                title: "Community Access",
                description: "Connect with beauty enthusiasts and experts"
            },
            {
                _uid: "benefit-4",
                icon: "support",
                title: "Priority Support",
                description: "Get help when you need it from our team"
            }
        ]
    };

    return (
        <Layout>
            <div className="min-h-screen bg-white pt-32 pb-20">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] mb-20">
                    <div className="text-center">
                        <h1 className="font-ivy text-6xl md:text-8xl text-black mb-6">
                            Membership
                        </h1>
                        <p className="font-termina text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Join our exclusive community and unlock premium benefits, special discounts, and access to limited edition products.
                        </p>
                    </div>
                </div>

                <MembershipTiers blok={membershipTiersData} />

                <MembershipBenefits blok={membershipBenefitsData} />

                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] mt-20">
                    <div className="bg-yello/10 rounded-2xl p-12 text-center">
                        <h2 className="font-ivy text-4xl md:text-5xl text-black mb-6">
                            Ready to Join?
                        </h2>
                        <p className="font-termina text-gray-700 mb-8 max-w-2xl mx-auto">
                            Start your membership today and experience the full range of benefits our community has to offer.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/register">
                                <button className="px-10 py-4 btn-primary font-termina text-lg">
                                    JOIN NOW
                                </button>
                            </a>
                            <a href="/contact">
                                <button className="px-10 py-4 btn-outline font-termina text-lg">
                                    LEARN MORE
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
