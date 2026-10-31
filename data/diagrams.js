window.DIAGRAMS = {
  // 1. 线程池执行流程
  "j-c1": `
    <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text3)"/>
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--danger)"/>
        </marker>
      </defs>
      
      <!-- Start Node -->
      <rect x="20" y="35" width="100" height="46" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="70" y="63" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">任务提交</text>

      <!-- Step 1: CorePool -->
      <line x1="120" y1="58" x2="160" y2="58" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <rect x="160" y="30" width="130" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="225" y="53" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent)">线程数 &lt; corePool?</text>
      <text x="225" y="72" text-anchor="middle" font-size="11" fill="var(--text2)">核心线程未满</text>

      <!-- Step 1 Yes: Create Core Worker -->
      <line x1="225" y1="86" x2="225" y2="135" stroke="var(--success)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="233" y="112" font-size="11" font-weight="600" fill="var(--success)">是</text>
      <rect x="160" y="135" width="130" height="46" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="225" y="163" text-anchor="middle" font-size="12" font-weight="600" fill="var(--success-text)">创建核心线程执行</text>

      <!-- Step 2: Queue -->
      <line x1="290" y1="58" x2="350" y2="58" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="315" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="var(--danger)">否</text>
      <rect x="350" y="30" width="130" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="415" y="53" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent)">阻塞队列 workQueue?</text>
      <text x="415" y="72" text-anchor="middle" font-size="11" fill="var(--text2)">能否入队成功</text>

      <!-- Step 2 Yes: In Queue -->
      <line x1="415" y1="86" x2="415" y2="135" stroke="var(--success)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="423" y="112" font-size="11" font-weight="600" fill="var(--success)">是</text>
      <rect x="350" y="135" width="130" height="46" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="415" y="163" text-anchor="middle" font-size="12" font-weight="600" fill="var(--success-text)">进入等待队列</text>

      <!-- Step 3: MaxPool -->
      <line x1="480" y1="58" x2="540" y2="58" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="505" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="var(--danger)">队列已满</text>
      <rect x="540" y="30" width="140" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="610" y="53" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent)">线程数 &lt; maximum?</text>
      <text x="610" y="72" text-anchor="middle" font-size="11" fill="var(--text2)">最大线程未满</text>

      <!-- Step 3 Yes: Non-core Worker -->
      <line x1="610" y1="86" x2="610" y2="135" stroke="var(--success)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="618" y="112" font-size="11" font-weight="600" fill="var(--success)">是</text>
      <rect x="540" y="135" width="140" height="46" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="610" y="163" text-anchor="middle" font-size="12" font-weight="600" fill="var(--success-text)">创建非核心线程执行</text>

      <!-- Step 4: Rejection -->
      <line x1="610" y1="181" x2="610" y2="230" stroke="var(--danger)" stroke-width="1.5" marker-end="url(#arrow-red)"/>
      <text x="618" y="210" font-size="11" font-weight="600" fill="var(--danger)">仍满 (溢出)</text>
      <rect x="510" y="230" width="200" height="66" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.5"/>
      <text x="610" y="253" text-anchor="middle" font-size="12" font-weight="600" fill="var(--danger-text)">执行拒绝策略 (Handler)</text>
      <text x="610" y="272" text-anchor="middle" font-size="11" fill="var(--danger-text)">Abort / CallerRuns / Discard</text>
      <text x="610" y="287" text-anchor="middle" font-size="10" fill="var(--text2)">（CallerRuns 可让调用线程天然降速）</text>
    </svg>
  `,

  // 2. TCP 三次握手与可靠传输
  "pack-h01": `
    <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:720px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="tcp-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Entity Columns -->
      <rect x="80" y="20" width="140" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="150" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">客户端 Client</text>
      <line x1="150" y1="58" x2="150" y2="280" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <rect x="500" y="20" width="140" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="570" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">服务端 Server (LISTEN)</text>
      <line x1="570" y1="58" x2="570" y2="280" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Handshake 1: SYN -->
      <line x1="150" y1="90" x2="560" y2="130" stroke="var(--accent)" stroke-width="2" marker-end="url(#tcp-arrow)"/>
      <rect x="270" y="90" width="180" height="24" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="360" y="106" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">1. SYN=1, seq=x</text>
      <text x="140" y="95" text-anchor="end" font-size="11" fill="var(--text3)">SYN_SENT</text>

      <!-- Handshake 2: SYN+ACK -->
      <line x1="570" y1="150" x2="160" y2="190" stroke="var(--accent)" stroke-width="2" marker-end="url(#tcp-arrow)"/>
      <rect x="250" y="150" width="220" height="24" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="360" y="166" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">2. SYN=1, ACK=1, seq=y, ack=x+1</text>
      <text x="580" y="155" text-anchor="start" font-size="11" fill="var(--text3)">SYN_RCVD</text>

      <!-- Handshake 3: ACK -->
      <line x1="150" y1="210" x2="560" y2="250" stroke="var(--accent)" stroke-width="2" marker-end="url(#tcp-arrow)"/>
      <rect x="270" y="210" width="180" height="24" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="360" y="226" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">3. ACK=1, seq=x+1, ack=y+1</text>
      <text x="140" y="215" text-anchor="end" font-size="11" font-weight="600" fill="var(--success-text)">ESTABLISHED</text>
      <text x="580" y="255" text-anchor="start" font-size="11" font-weight="600" fill="var(--success-text)">ESTABLISHED</text>
    </svg>
  `,

  // 3. TCP 四次挥手与 TIME_WAIT
  "pack-h03": `
    <svg viewBox="0 0 740 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="wave-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="80" y="20" width="150" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="155" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">主动关闭方 Client</text>
      <line x1="155" y1="58" x2="155" y2="310" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <rect x="510" y="20" width="150" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="585" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">被动关闭方 Server</text>
      <line x1="585" y1="58" x2="585" y2="310" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Wave 1: FIN -->
      <line x1="155" y1="85" x2="575" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="95" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">1. FIN (seq=u)</text>
      <text x="145" y="85" text-anchor="end" font-size="11" fill="var(--text3)">FIN_WAIT_1</text>

      <!-- Wave 2: ACK -->
      <line x1="585" y1="130" x2="165" y2="160" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="140" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">2. ACK (ack=u+1)</text>
      <text x="595" y="130" text-anchor="start" font-size="11" fill="var(--warn-text)">CLOSE_WAIT (待发完残余数据)</text>
      <text x="145" y="165" text-anchor="end" font-size="11" fill="var(--text3)">FIN_WAIT_2</text>

      <!-- Wave 3: Server FIN -->
      <line x1="585" y1="185" x2="165" y2="215" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="195" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">3. FIN (seq=w, ack=u+1)</text>
      <text x="595" y="190" text-anchor="start" font-size="11" fill="var(--text3)">LAST_ACK</text>

      <!-- Wave 4: Final ACK -->
      <line x1="155" y1="235" x2="575" y2="265" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="245" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">4. ACK (ack=w+1)</text>
      <text x="595" y="270" text-anchor="start" font-size="11" font-weight="600" fill="var(--success-text)">CLOSED</text>

      <!-- TIME_WAIT Box -->
      <rect x="50" y="245" width="95" height="50" rx="6" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.5"/>
      <text x="97" y="265" text-anchor="middle" font-size="11" font-weight="700" fill="var(--warn-text)">TIME_WAIT</text>
      <text x="97" y="283" text-anchor="middle" font-size="10" fill="var(--warn-text)">等待 2MSL</text>
    </svg>
  `,

  // 4. JVM 内存结构划分
  "j-v1": `
    <svg viewBox="0 0 740 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <!-- Outer JVM Container -->
      <rect x="20" y="20" width="700" height="280" rx="12" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="40" y="44" font-size="14" font-weight="700" fill="var(--text)">JVM 运行时数据区 (Runtime Data Area)</text>

      <!-- Thread Shared -->
      <rect x="40" y="60" width="370" height="220" rx="8" fill="var(--bg-elev)" stroke="var(--accent-border)" stroke-width="1.5"/>
      <text x="55" y="82" font-size="12.5" font-weight="700" fill="var(--accent)">线程共享区 (Shared Area)</text>

      <!-- Heap Inner -->
      <rect x="55" y="95" width="340" height="110" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="70" y="115" font-size="12" font-weight="600" fill="var(--accent)">Java 堆 (Heap)</text>
      
      <!-- Young Gen -->
      <rect x="70" y="125" width="180" height="65" rx="4" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="80" y="142" font-size="11" font-weight="600" fill="var(--text)">新生代 (Young Generation)</text>
      <text x="80" y="160" font-size="10" fill="var(--text2)">Eden (8) : S0 (1) : S1 (1)</text>
      <text x="80" y="176" font-size="9.5" fill="var(--success-text)">Minor GC / 复制算法</text>

      <!-- Old Gen -->
      <rect x="260" y="125" width="120" height="65" rx="4" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="270" y="142" font-size="11" font-weight="600" fill="var(--text)">老年代 (Old Gen)</text>
      <text x="270" y="160" font-size="10" fill="var(--text2)">长期存活对象</text>
      <text x="270" y="176" font-size="9.5" fill="var(--warn-text)">Major / Full GC</text>

      <!-- Metaspace -->
      <rect x="55" y="215" width="340" height="50" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="70" y="235" font-size="11.5" font-weight="600" fill="var(--text)">元空间 (Metaspace, JDK 8+ 移至本地内存)</text>
      <text x="70" y="252" font-size="10.5" fill="var(--text3)">类元数据、常量池、静态变量</text>

      <!-- Thread Private -->
      <rect x="430" y="60" width="270" height="220" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="445" y="82" font-size="12.5" font-weight="700" fill="var(--text2)">线程私有区 (Per-thread Area)</text>

      <rect x="445" y="95" width="240" height="50" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="460" y="116" font-size="11.5" font-weight="600" fill="var(--text)">虚拟机栈 (Java Virtual Machine Stacks)</text>
      <text x="460" y="133" font-size="10" fill="var(--text3)">栈帧：局部变量表、操作数栈、动态链接</text>

      <rect x="445" y="155" width="240" height="50" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="460" y="176" font-size="11.5" font-weight="600" fill="var(--text)">本地方法栈 (Native Method Stacks)</text>
      <text x="460" y="193" font-size="10" fill="var(--text3)">支持 JNI Native C/C++ 方法执行</text>

      <rect x="445" y="215" width="240" height="50" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="460" y="236" font-size="11.5" font-weight="600" fill="var(--text)">程序计数器 (Program Counter Register)</text>
      <text x="460" y="253" font-size="10" fill="var(--text3)">当前线程正在执行的字节码指令地址</text>
    </svg>
  `,

  // 5. Spring Bean 生命周期
  "j-s2": `
    <svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="sp-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Step 1: Instantiation -->
      <rect x="15" y="45" width="105" height="70" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="67" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">1. 实例化</text>
      <text x="67" y="95" text-anchor="middle" font-size="10" fill="var(--text3)">反射创建对象</text>

      <line x1="120" y1="80" x2="140" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <!-- Step 2: Populate -->
      <rect x="140" y="45" width="105" height="70" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="192" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">2. 属性填充</text>
      <text x="192" y="95" text-anchor="middle" font-size="10" fill="var(--text3)">@Autowired 依赖注入</text>

      <line x1="245" y1="80" x2="265" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <!-- Step 3: Aware -->
      <rect x="265" y="45" width="105" height="70" rx="8" fill="var(--accent-soft)" stroke="var(--accent-border)" stroke-width="1.5"/>
      <text x="317" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">3. Aware 注入</text>
      <text x="317" y="95" text-anchor="middle" font-size="10" fill="var(--accent)">BeanName/Context</text>

      <line x1="370" y1="80" x2="390" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <!-- Step 4: BPP Before & Init -->
      <rect x="390" y="30" width="125" height="100" rx="8" fill="var(--bg-elev)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="452" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">4. 初始化阶段</text>
      <text x="452" y="75" text-anchor="middle" font-size="10" fill="var(--text2)">BPP 前置处理</text>
      <text x="452" y="92" text-anchor="middle" font-size="10" font-weight="600" fill="var(--success-text)">@PostConstruct / init</text>
      <text x="452" y="110" text-anchor="middle" font-size="10" fill="var(--text2)">BPP 后置 (AOP动态代理)</text>

      <line x1="515" y1="80" x2="535" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <!-- Step 5: Ready -->
      <rect x="535" y="45" width="100" height="70" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="585" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success-text)">5. 投入就绪</text>
      <text x="585" y="95" text-anchor="middle" font-size="10" fill="var(--success-text)">放入单例池使用</text>

      <line x1="635" y1="80" x2="655" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <!-- Step 6: Destroy -->
      <rect x="655" y="45" width="90" height="70" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.5"/>
      <text x="700" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--danger-text)">6. 销毁</text>
      <text x="700" y="95" text-anchor="middle" font-size="10" fill="var(--danger-text)">@PreDestroy</text>
    </svg>
  `,

  // 6. RAG 向量检索与增强生成全流程
  "a-r1": `
    <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="rag-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Offline Pipeline -->
      <rect x="20" y="20" width="720" height="110" rx="10" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="40" y="44" font-size="12.5" font-weight="700" fill="var(--text2)">阶段一：离线知识库构建 (Indexing Pipeline)</text>

      <rect x="40" y="60" width="120" height="50" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="100" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">原始文档集</text>
      <text x="100" y="98" text-anchor="middle" font-size="10" fill="var(--text3)">PDF / MD / Word</text>

      <line x1="160" y1="85" x2="190" y2="85" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="190" y="60" width="130" height="50" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="255" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">文本分块 (Chunking)</text>
      <text x="255" y="98" text-anchor="middle" font-size="10" fill="var(--text3)">固定大小 / 语义切分</text>

      <line x1="320" y1="85" x2="350" y2="85" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="350" y="60" width="140" height="50" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="420" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">Embedding 向量化</text>
      <text x="420" y="98" text-anchor="middle" font-size="10" fill="var(--accent)">文本转密集向量</text>

      <line x1="490" y1="85" x2="520" y2="85" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="520" y="60" width="200" height="50" rx="6" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1"/>
      <text x="620" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--success-text)">向量数据库 (Vector DB)</text>
      <text x="620" y="98" text-anchor="middle" font-size="10" fill="var(--success-text)">Milvus / PGVector / Qdrant</text>

      <!-- Online Pipeline -->
      <rect x="20" y="150" width="720" height="130" rx="10" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="40" y="174" font-size="12.5" font-weight="700" fill="var(--text2)">阶段二：在线检索与生成 (Retrieval & Generation)</text>

      <rect x="40" y="195" width="110" height="60" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="95" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">用户提问 Query</text>
      <text x="95" y="240" text-anchor="middle" font-size="10" fill="var(--text3)">问句 Embedding</text>

      <line x1="150" y1="225" x2="180" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="180" y="195" width="125" height="60" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="242" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">语义相似度检索</text>
      <text x="242" y="240" text-anchor="middle" font-size="10" fill="var(--accent)">Top-K 粗筛召回</text>

      <line x1="305" y1="225" x2="335" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="335" y="195" width="115" height="60" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="392" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">重排 (Rerank)</text>
      <text x="392" y="240" text-anchor="middle" font-size="10" fill="var(--accent)">精排消歧/降噪</text>

      <line x1="450" y1="225" x2="480" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="480" y="195" width="115" height="60" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="537" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">Prompt 组装</text>
      <text x="537" y="240" text-anchor="middle" font-size="10" fill="var(--text3)">拼接 Context 上下文</text>

      <line x1="595" y1="225" x2="625" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="625" y="195" width="100" height="60" rx="6" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1"/>
      <text x="675" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--success-text)">LLM 生成回答</text>
      <text x="675" y="240" text-anchor="middle" font-size="10" fill="var(--success-text)">准确有根据输出</text>
    </svg>
  `,

  // 7. AI Agent ReAct 循环架构
  "a-a1": `
    <svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="ag-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
        <marker id="ag-success" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--success)"/>
        </marker>
      </defs>

      <!-- Input Node -->
      <rect x="20" y="90" width="100" height="50" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="70" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">用户指令</text>
      <text x="70" y="128" text-anchor="middle" font-size="10" fill="var(--text3)">Goal / Query</text>

      <line x1="120" y1="115" x2="160" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#ag-arrow)"/>

      <!-- ReAct Loop Big Box -->
      <rect x="160" y="20" width="410" height="210" rx="12" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="6 4"/>
      <text x="180" y="44" font-size="12" font-weight="700" fill="var(--accent)">ReAct 闭环循环 (Reasoning + Acting Loop)</text>

      <!-- Thought -->
      <rect x="185" y="65" width="160" height="55" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="265" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">💭 Thought (推理思考)</text>
      <text x="265" y="108" text-anchor="middle" font-size="10.5" fill="var(--text3)">当前状态如何？下一步做什么？</text>

      <line x1="345" y1="92" x2="385" y2="92" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#ag-arrow)"/>

      <!-- Action -->
      <rect x="385" y="65" width="165" height="55" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="467" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">⚡ Action (行动决策)</text>
      <text x="467" y="108" text-anchor="middle" font-size="10.5" fill="var(--text3)">选择工具/API 及参数 payload</text>

      <line x1="467" y1="120" x2="467" y2="150" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#ag-arrow)"/>

      <!-- Tool Execution & Observation -->
      <rect x="385" y="150" width="165" height="60" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="467" y="174" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">🛠️ Tool Execution</text>
      <text x="467" y="192" text-anchor="middle" font-size="10" fill="var(--text2)">执行搜索 / DB 查询 / 计算</text>

      <line x1="385" y1="180" x2="265" y2="180" stroke="var(--accent)" stroke-width="1.8"/>
      <line x1="265" y1="180" x2="265" y2="125" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#ag-arrow)"/>

      <rect x="185" y="145" width="160" height="30" rx="5" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="265" y="165" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text2)">👁️ Observation 观察结果</text>

      <!-- Loop Finish to Output -->
      <line x1="570" y1="92" x2="610" y2="92" stroke="var(--success)" stroke-width="2" marker-end="url(#ag-success)"/>
      <text x="590" y="84" text-anchor="middle" font-size="10" font-weight="600" fill="var(--success)">目标达成</text>

      <rect x="610" y="65" width="110" height="55" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="665" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success-text)">Final Answer</text>
      <text x="665" y="108" text-anchor="middle" font-size="10" fill="var(--success-text)">交付最终结果</text>
    </svg>
  `
};
