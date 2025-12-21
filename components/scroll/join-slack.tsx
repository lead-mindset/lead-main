"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Sparkles } from "lucide-react";

export default function JoinSlackCommunity() {
    return (
        <section className="w-full flex justify-center py-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-5xl w-full"
            >
                <Card className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-[#4A154B] via-[#611f69] to-[#7c2a86] text-white">
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/20 rounded-full blur-3xl" />

                    <CardContent className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-10 md:p-14">
                        <div className="flex flex-col justify-center">

                            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                                Join our Slack community
                            </h2>

                            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl">
                                Our main space to connect, collaborate, and stay aligned. Share updates, ask questions, celebrate wins, and grow together as a community.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-white text-[#4A154B] hover:bg-white/90 font-semibold rounded-xl"
                                >
                                    Join Slack
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>

                                <div className="flex items-center gap-2 text-sm text-white/70">
                                    <Users className="w-4 h-4" />
                                    Free to join
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-4 max-w-sm">
                            {[
                                "Stay updated on the latest LEAD initiatives and events",
                                "Connect with students who think, lead, and act like you",
                                "Build and execute projects that matter, not just ideas",
                                "Grow as a leader and turn action into professional value"
                            ].map(
                                (item, i) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                        <span className="text-sm md:text-base text-white/90">
                                            {item}
                                        </span>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
