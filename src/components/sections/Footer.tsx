"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export default function Footer() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  return (
    <>
      <footer id="contact" className="relative py-24 px-6 border-t border-gold-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gold-light"
          >
            建立联系
          </motion.h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent mx-auto mb-4" />
          <p className="text-text-muted mb-10 max-w-md mx-auto">
            有 AI 项目想法？随时联系
          </p>

          <motion.button
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => setShow(true)}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-glow text-bg font-medium px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] mb-16"
          >
            发送信号
          </motion.button>

          <p className="text-text-muted text-xs">构建者 · AI 驱动创作</p>
        </div>
      </footer>

      {/* QR overlay */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
            onClick={() => setShow(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-surface border border-gold-border/30 rounded-3xl p-10 flex flex-col items-center max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-gold-light text-lg font-semibold mb-4">扫码添加微信</p>
              <img
                src="/qrcode.jpg"
                alt="微信二维码"
                className="w-72 max-w-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
